const mongoose = require('mongoose')
const db = mongoose.connection
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/expense-record'
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

module.exports = db