const { protect } = require('../controllers/AuthController')
const { createReview } = require('../controllers/ReviewController')
const { getAll, deleteAll, getOne, deleteOne, updateOne, updatePhoto } = require('../controllers/handleFactory')
const { restrictTo } = require('../middleware/restrictTo')
const upload = require('../middleware/uploadOption')
const Review = require('../models/ReviewModel')

const router = require('express').Router()

router.route('/')
    .post(protect, restrictTo('admin'), upload.single('file'), createReview)
    .get(getAll(Review))
    .delete(protect, restrictTo('admin'), deleteAll(Review))

router.route('/:id')
    .get(getOne(Review))
    .delete(protect, restrictTo('admin'), deleteOne(Review))
    .patch(protect, restrictTo('admin'), updateOne(Review))

router.route('/:id/img')
    .patch(protect, restrictTo('admin'), upload.single('file'), updatePhoto(Review))

module.exports = router