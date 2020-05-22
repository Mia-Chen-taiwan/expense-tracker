const db = require('../../config/mongoose')
const Record = require('../record')
const recordList = require('./record.json')
const Category = require('../category')
const categoryList = require('./category.json')

db.once('open', () => {
  recordList.results.forEach((record) => {
    Record.create({
      name: record.name,
      category: record.category,
      date: record.date,
      amount: record.amount
    })
  })

  categoryList.results.forEach((category) => {
    Category.create({
      name: category.name,
      icon: category.icon
    })
  })
  
  console.log('done!')
})