const Record = require('../record')
const db = require('../../config/mongoose')
const recordList = require('./record.json')

db.once('open', () => {
  recordList.results.forEach((record) => {
    Record.create({
      name: record.name,
      category: record.category,
      date: record.date,
      amount: record.amount
    })
  })
  console.log('Done!')
})