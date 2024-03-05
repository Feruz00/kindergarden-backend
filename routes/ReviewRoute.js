const { createReview } = require('../controllers/ReviewController')
const { getAll, deleteAll, getOne, deleteOne, updateOne, updatePhoto } = require('../controllers/handleFactory')
const upload = require('../middleware/uploadOption')
const Review = require('../models/ReviewModel')

const router = require('express').Router()

router.route('/')
    .post(upload.single('file'), createReview)
    .get(getAll(Review))
    .delete(deleteAll(Review))

router.route('/:id')
    .get(getOne(Review))
    .delete(deleteOne(Review))
    .patch(updateOne(Review))

router.route('/:id/img')
    .patch( upload.single('file'), updatePhoto(Review))

module.exports = router