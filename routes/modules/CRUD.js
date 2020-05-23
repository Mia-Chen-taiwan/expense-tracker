const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// CREATE add new record
router.get('/new', (req,res) => {
    Category.find()
    .lean()
    .then((categories) => {
        res.render('new', { categories })
    })
    .catch(error => console.log(error))
})

router.post('/new', (req,res) => {
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
router.get('/:id/edit', (req,res) => {
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

router.put('/:id', (req,res) => {
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
router.delete('/:id', (req,res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router