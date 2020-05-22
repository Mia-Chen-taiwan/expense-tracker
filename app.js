const express = require('express')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
require('./config/mongoose')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// READ view all records
app.get('/', (req, res) => {
    Record.find()
      .lean()
      .then((records) => {
          // 加總所有花費
          let amounts = []
          let totalAmount = 0
          records.forEach(r => amounts.push(r.amount))
          for (let i in amounts) {
              totalAmount += amounts[i]
          }
          res.render('index', { records, totalAmount })
      })
      .catch(error => console.log(error))
})

// CREATE add new record
app.get('records/new', (req,res) => {
    return res.render('new')
})

app.listen(PORT, () => [
    console.log(`App is running on http://localhost:${PORT}`)
])