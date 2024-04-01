
const { protect } = require('../controllers/AuthController')
const { createGallery, updatePicture, updateGalleryPdf } = require('../controllers/GalleryConrtoller')
const { getAll, deleteAll, getOne, updateOne, deleteOne, updatePhoto } = require('../controllers/handleFactory')
const galleryOptions = require('../middleware/galleryOptions')
const { restrictTo } = require('../middleware/restrictTo')
const Gallery = require('../models/GalleryModel')

const router = require('express').Router()

router.route('/')
    .get(getAll(Gallery, undefined, ['type']))
    .delete(protect, restrictTo('admin'), deleteAll(Gallery))
    .post( protect, restrictTo('admin'), galleryOptions.fields([
        {name:'picture', maxCount: 1},
        {name: 'file', maxCount: 1}
    ]), createGallery )
    .put(protect, restrictTo('admin'), updateGalleryPdf)
router.route('/:id')
    .get(getOne(Gallery, undefined, ['type']))
    .patch( protect, restrictTo('admin'), updateOne(Gallery))
    .delete( protect, restrictTo('admin'), deleteOne(Gallery))

router.route('/:id/file')
    .patch( protect, restrictTo('admin'), galleryOptions.single("file"), updatePhoto(Gallery))

router.route('/:id/image')
    .patch(protect, restrictTo('admin'), galleryOptions.single("file"), updatePicture)


module.exports = router