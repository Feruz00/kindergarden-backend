const { protect } = require('../controllers/AuthController')
const { createOne, deleteAll, getAll, getOne, deleteOne, updateOne } = require('../controllers/handleFactory')
const { restrictTo } = require('../middleware/restrictTo')
const GalleryType = require('../models/GalleryTypeModel')

const router = require('express').Router()

router.route('/')
    .post(protect, restrictTo('admin'), createOne(GalleryType))
    .delete(protect, restrictTo('admin'), deleteAll(GalleryType))
    .get(getAll(GalleryType))

router.route('/:id')
    .get(getOne(GalleryType))
    .delete(protect, restrictTo('admin'), deleteOne(GalleryType))
    .put(protect, restrictTo('admin'), updateOne(GalleryType))

module.exports = router