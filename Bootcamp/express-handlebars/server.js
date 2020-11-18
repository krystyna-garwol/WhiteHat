const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

// ------ Routes -----

app.get('/', (request, response) => {
    response.render('index')
})
app.get('/black', (request, response) => {
    response.render('black')
})
app.get('/grey', (request, response) => {
    response.render('grey')
})
app.get('/ginger', (request, response) => {
    response.render('ginger')
})
app.get('/white', (request, response) => {
    response.render('white')
})


app.listen(3000, () => {
    console.log('web server running on port 3000')
})