const { protect } = require('../controllers/AuthController')
const { createOne } = require('../controllers/handleFactory')
const { restrictTo } = require('../middleware/restrictTo')
const Contest = require('../models/ContestModel')

const router = require('express').Router()

router.route('/')
    .post(protect, restrictTo('admin'), createOne(Contest))

module.exports = router