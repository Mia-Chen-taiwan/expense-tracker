const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// READ view all records
router.get('/', (req, res) => {
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

module.exports = router