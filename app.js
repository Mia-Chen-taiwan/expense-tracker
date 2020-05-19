const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const db = mongoose.connection

const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost/expense-record', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => [
    console.log(`App is running on http://localhost:${PORT}`)
])