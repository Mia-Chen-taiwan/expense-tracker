const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const CRUD = require('./modules/CRUD')
const filter = require('./modules/filter')

router.use('/', home)
router.use('/records', CRUD)
router.use('/records/filter', filter)

module.exports = router