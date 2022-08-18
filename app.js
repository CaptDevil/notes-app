const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express()

app.use(cors({
    origin: '*'
}))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(err)
        throw err
    else
        console.log('Connected to database...')
})
require('./model/note')
require('./model/user')

const Note = mongoose.model('Note')
const User = mongoose.model('User')

function verifyToken(token) {
    const data =  jwt.verify(token, process.env.SECRET_KEY).email
    return data;
}

app.post('/allnotes',(req,res) => {
    const { token, archive, trash } = req.body;
    Note.find({ user: verifyToken(token), archive, trash }).sort({_id: -1}).exec((err,docs) => {
        if(err)
            throw err;
        res.send(docs)
    })
})

app.post('/alltrash', (req,res) => {
    const { token } = req.body;
    Note.find({ user: verifyToken(token), trash: true }).sort({_id: -1}).exec((err,docs) => {
        if(err)
            throw err;
        res.send(docs)
    })
})

app.post('/getnote/:id',(req,res) => {
    const { token } = req.body;
    Note.findOne({_id: req.params.id, user: verifyToken(token)}, (err, docs) => {
        if(err)
            throw err;
        res.send(docs)
    })
})

app.post('/updatenote',(req,res) => {
    const { _id, heading, body, token } = req.body;
    Note.updateOne({_id, user: verifyToken(token)}, { heading, body }, (err) => {
        if(err)
            throw err;
        // console.log(doc)
        res.send('updated')
    })
})

app.post('/newnote',(req,res) => {
    const { token } = req.body;
    let note = new Note({ heading: '', body: '', user: verifyToken(token) })
    note.save((err,doc) => {
        if(err)
            throw err
        res.send(doc._id)
    })
})

app.post('/registeruser', (req,res) => {
    const { name, email, password } = req.body;
    User.find({ email }, (err,docs) => {
        bcrypt.genSalt(10).then((salt) => {
            bcrypt.hash(password, salt).then((hashedPassword) => {
                if(docs.length === 0) {
                    let user = new User({ name, email, password: hashedPassword })
                    user.save((err,doc) => {
                        if(err)
                            throw err
                        // console.log(doc)
                        res.status(200).json({
                            token: jwt.sign({ email }, process.env.SECRET_KEY),
                            user: name
                        });
                    })
                }
                else {
                    User.updateOne({email},{password: hashedPassword},(err,doc) => {
                        if(err)
                            throw err
                        // console.log(doc)
                        res.status(200).json({
                            token: jwt.sign({ email }, process.env.SECRET_KEY),
                            user: name
                        });
                    })
                }
            })
        })
    })
})

app.get('/loginuser/:token', (req,res) => {
    const { token } = req.params;
    User.find({email: verifyToken(token)}, (err, doc) => {
        if(err)
            throw err
        if(doc.length !== 0) {
            res.status(200).json({
                token: jwt.sign({ email: doc[0].email }, process.env.SECRET_KEY),
                user: doc[0].name
            })
        }
        else
            res.sendStatus(404)
    })
})

app.post('/loginuser', (req,res) => {
    const {email, password} = req.body
    User.find({email}, (err, doc) => {
        if(err)
            throw err
        if(doc.length !== 0) {
            bcrypt.compare(password,doc[0].password)
                .then((result) => {
                    (result ? res.status(200).json({
                        token: jwt.sign({ email: doc[0].email }, process.env.SECRET_KEY),
                        user: doc[0].name
                    }) : res.sendStatus(404))
                })
        }
        else
            res.sendStatus(404)
    })
})

app.post('/trash/:id', (req,res) => {
    const { token } = req.body;
    const _id = req.params.id;
    Note.updateOne({ user: verifyToken(token), _id }, {trash: true}, (err) => {
        if(err)
            throw err
        res.send('done')
    })
})

app.post('/restore/:id', (req,res) => {
    const { token } = req.body;
    const _id = req.params.id;
    Note.updateOne({ user: verifyToken(token), _id }, {trash: false}, (err) => {
        if(err)
            throw err
        res.send('done')
    })
})

app.post('/archive/:id', (req,res) => {
    const { token } = req.body;
    const _id = req.params.id;
    Note.updateOne({ user: verifyToken(token), _id }, {archive: true}, (err) => {
        if(err)
            throw err
        res.send('done')
    })
})

app.post('/unarchive/:id', (req,res) => {
    const { token } = req.body;
    const _id = req.params.id;
    Note.updateOne({ user: verifyToken(token), _id }, {archive: false}, (err) => {
        if(err)
            throw err
        res.send('done')
    })
})

app.post('/delete/:id', (req,res) => {
    const { token } = req.body;
    const _id = req.params.id;
    Note.deleteOne({ _id, user: verifyToken(token) }, (err, results) => {
        if(err)
            throw err
        res.send('done')
    })
})

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'))
    app.get('*', (req,res) => res.sendFile('./client/build/index.html'))
}

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on port ${port}...`))