const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

//READ filtering by category
router.get('/',(req, res) => {
    const category = req.query.filter
    // 全部支出 => home page
    if (category === "") { 
      return res.redirect('/')
    }
    // 其他類別 => 篩選後再和首頁一樣的方式渲染
    const categoryList = []
    const amounts = []          
    let totalAmount = 0
    let filter = category
    Record.find()
      .lean()
      .then((r) => {
        // 篩選放進records
        let records = r.filter(r => { 
          return r.category === category})
        // 配對icon、計算總額、渲染畫面
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

module.exports = router