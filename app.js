const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

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
    Note.find({user: req.body.user}).sort({_id: -1}).exec((err,docs) => {
        if(err)
            throw err;
        res.send(docs)
    })
})

app.get('/getnote/:id',(req,res) => {
    Note.findOne({_id: req.params.id}, (err, docs) => {
        if(err)
            throw err;
        res.send(docs)
    })
})

app.post('/updatenote',(req,res) => {
    let { _id, heading, body } = req.body;
    Note.updateOne({_id}, { heading, body }, (err,doc) => {
        if(err)
            throw err;
        console.log(doc)
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
    let { name, email, password } = req.body;
    User.find({ email }, (err,docs) => {
        if(docs.length === 0) {
            let user = new User({ name, email, password })
            user.save((err,doc) => {
                if(err)
                    throw err
                console.log(doc)
                res.send('registered');
            })
        }
        else {
            User.updateOne({email},{password},(err,doc) => {
                if(err)
                    throw err
                console.log(doc)
                res.send('registered');
            })
        }
    })
})

app.post('/loginuser', (req,res) => {
    let {email, password} = req.body
    User.find({email}, (err, doc) => {
        if(err)
            throw err
        if(doc.length !== 0) {
            if (password === doc[0].password)
                res.send('right');
            else 
                res.send('wrong')
        }
        else
            res.send('wrong')
    })
})

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on port ${port}...`))