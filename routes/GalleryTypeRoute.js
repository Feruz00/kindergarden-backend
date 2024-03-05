const { createOne, deleteAll, getAll, getOne, deleteOne, updateOne } = require('../controllers/handleFactory')
const GalleryType = require('../models/GalleryTypeModel')

const router = require('express').Router()

router.route('/')
    .post(createOne(GalleryType))
    .delete(deleteAll(GalleryType))
    .get(getAll(GalleryType))

router.route('/:id')
    .get(getOne(GalleryType))
    .delete(deleteOne(GalleryType))
    .put(updateOne(GalleryType))

module.exports = router