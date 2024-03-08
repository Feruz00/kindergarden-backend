const { createGallery, updatePicture } = require('../controllers/GalleryConrtoller')
const { getAll, deleteAll, getOne, updateOne, deleteOne, updatePhoto } = require('../controllers/handleFactory')
const galleryOptions = require('../middleware/galleryOptions')
const Gallery = require('../models/GalleryModel')

const router = require('express').Router()

router.route('/')
    .get(getAll(Gallery, undefined, ['type']))
    .delete(deleteAll(Gallery))
    .post(galleryOptions.fields([
        {name:'picture', maxCount: 1},
        {name: 'file', maxCount: 1}
    ]), createGallery )

router.route('/:id')
    .get(getOne(Gallery, undefined, ['type']))
    .patch(updateOne(Gallery))
    .delete(deleteOne(Gallery))

router.route('/:id/file')
    .patch( galleryOptions.single("file"), updatePhoto(Gallery))

router.route('/:id/image')
    .patch( galleryOptions.single("file"), updatePicture)


module.exports = router