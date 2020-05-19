const express = require('express')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
require('./config/mongoose')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    Record.find()
      .lean()
      .then(records => res.render('index', { records }))
      .catch(error => console.log(error))
})

app.listen(PORT, () => [
    console.log(`App is running on http://localhost:${PORT}`)
])