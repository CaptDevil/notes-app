const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

/*const notes = [
    {id: '1', heading: 'heading 1', body: 'this is note\nhello'},
    {id: '2', heading: 'heading 2', body: 'this is note\nhello'},
    {id: '3', heading: 'heading 3', body: 'this is note\nhello'},
    {id: '4', heading: 'heading 4', body: 'this is note\nhello'},
    {id: '5', heading: 'heading 5', body: 'this is note\nhello'}
]*/

app.post('/allnotes',(req,res) => {
    const { user, archive, trash } = req.body;
    Note.find({ user, archive, trash }).sort({_id: -1}).exec((err,docs) => {
        if(err)
            throw err;
        res.send(docs)
    })
})

app.post('/alltrash', (req,res) => {
    const { user } = req.body;
    Note.find({ user, trash: true }).sort({_id: -1}).exec((err,docs) => {
        if(err)
            throw err;
        res.send(docs)
    })
})

app.post('/getnote/:id',(req,res) => {
    const { user } = req.body;
    Note.findOne({_id: req.params.id, user}, (err, docs) => {
        if(err)
            throw err;
        res.send(docs)
    })
})

app.post('/updatenote',(req,res) => {
    const { _id, heading, body, user } = req.body;
    Note.updateOne({_id, user}, { heading, body }, (err) => {
        if(err)
            throw err;
        // console.log(doc)
        res.send('updated')
    })
})

app.post('/newnote',(req,res) => {
    let note = new Note({ heading: '', body: '', user: req.body.user })
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
                        res.send('registered');
                    })
                }
                else {
                    User.updateOne({email},{password: hashedPassword},(err,doc) => {
                        if(err)
                            throw err
                        // console.log(doc)
                        res.send('registered');
                    })
                }
            })
        })
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
                    if(result === true)
                        res.send('right')
                    else
                        res.send('wrong')
                })
        }
        else
            res.send('wrong')
    })
})

app.post('/trash/:id', (req,res) => {
    const { user } = req.body;
    const _id = req.params.id;
    Note.updateOne({ user, _id }, {trash: true}, (err) => {
        if(err)
            throw err
        res.send('done')
    })
})

app.post('/restore/:id', (req,res) => {
    const { user } = req.body;
    const _id = req.params.id;
    Note.updateOne({ user, _id }, {trash: false}, (err) => {
        if(err)
            throw err
        res.send('done')
    })
})

app.post('/archive/:id', (req,res) => {
    const { user } = req.body;
    const _id = req.params.id;
    Note.updateOne({ user, _id }, {archive: true}, (err) => {
        if(err)
            throw err
        res.send('done')
    })
})

app.post('/unarchive/:id', (req,res) => {
    const { user } = req.body;
    const _id = req.params.id;
    Note.updateOne({ user, _id }, {archive: false}, (err) => {
        if(err)
            throw err
        res.send('done')
    })
})

app.post('/delete/:id', (req,res) => {
    const { user } = req.body;
    const _id = req.params.id;
    Note.deleteOne({ _id, user }, (err, results) => {
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