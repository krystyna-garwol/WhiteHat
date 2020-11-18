const express = require('express')
const app = express()
const Task = require('./src/Task')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/tasks', (req, res) => {
    res.send(Task.all)
})

app.post('/tasks', (req, res) => {
    Task.all.push(req.body)
    res.send()
})

app.listen(3000, () => {
    new Task("make a new task"),
    new Task("add an input form")
    console.log('app server running on port', 3000)
})