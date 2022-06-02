const express = require('express');
const cors = require('cors');

const app = express()

app.use(cors({
    origin: '*'
}))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

const notes = [
    {id: '1', heading: 'heading 1', body: 'this is note\nhello'},
    {id: '2', heading: 'heading 2', body: 'this is note\nhello'},
    {id: '3', heading: 'heading 3', body: 'this is note\nhello'},
    {id: '4', heading: 'heading 4', body: 'this is note\nhello'},
    {id: '5', heading: 'heading 5', body: 'this is note\nhello'}
]

app.get('/',(req,res) => {
    res.send(JSON.stringify(notes))
})

app.get('/getnote/:id',(req,res) => {
    res.send(JSON.stringify(notes[parseInt(req.params.id)-1]))
})

app.post('/updatenote',(req,res) => {
    notes[parseInt(req.body.id)-1] = req.body;
})

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on port ${port}...`))