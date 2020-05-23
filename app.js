const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Record = require('./models/record')
const Category = require('./models/category')
require('./config/mongoose')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// READ view all records
app.get('/', (req, res) => {
    Record.find()
      .lean()
      .then((records) => {
        // Q: 要怎麼配對icon?
        // sol: 用Record的category去find() Category中對應的icon
        // Q: 無法用 forEach() 直接加總提取的所有amount?
        // sol: 先傳入array再加總
        const categoryList = []
        const amounts = []          
        let totalAmount = 0
        let filter = '全部支出'
        Category.find()
        .lean()
        .then((categories) => {
          categories.forEach(c => categoryList.push(c))
          records.forEach((r) => {
            // 找出對應icon並加入records
            let c_icon = categoryList.find(c => c.name === r.category)
            r.icon = c_icon.icon
            amounts.push(r.amount)
          })
          // 加總所有花費
          for (let i in amounts) {
              totalAmount += amounts[i]
          }
          res.render('index', { records, totalAmount, categories, filter })
        })
        .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
})

//READ filtering by category
app.get('/records/filter',(req, res) => {
  const category = req.query.filter
  if (category === "") { 
    return res.redirect('/')
  }
  const categoryList = []
  const amounts = []          
  let totalAmount = 0
  let filter = category
  Record.find()
    .lean()
    .then((r) => {
      let records = r.filter(r => { 
        return r.category === category})
      Category.find()
        .lean()
        .then((categories) => {
          categories.forEach(c => categoryList.push(c))
          records.forEach((r) => {
            // 找出對應icon並加入records
            let c_icon = categoryList.find(c => c.name === category)
            r.icon = c_icon.icon
            amounts.push(r.amount)
          })
          // 加總所有花費
          for (let i in amounts) {
              totalAmount += amounts[i]
          }
          res.render('index', { records, totalAmount, categories, filter })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

// CREATE add new record
app.get('/records/new', (req,res) => {
    Category.find()
    .lean()
    .then((categories) => {
        res.render('new', { categories })
    })
    .catch(error => console.log(error))
})

app.post('/records/new', (req,res) => {
  const record = req.body
  return Record.create({
    name: record.name,
    category: record.category,
    date: record.date,
    amount: record.amount
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// UPDATE edit record
app.get('/records/:id/edit', (req,res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => {
      Category.find()
        .lean()
        .then((categories) => {
            res.render('edit', { record, categories })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

app.put('/records/:id', (req,res) => {
  const id = req.params.id
  const { name, category, date, amount } = req.body
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.category = category
      record.date = date
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// DELETE remove record function
app.delete('/records/:id', (req,res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(PORT, () => [
    console.log(`App is running on http://localhost:${PORT}`)
])