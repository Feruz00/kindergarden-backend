// const { route } = require("..")
const { protect } = require("../controllers/AuthController")
const { createEducation, updatePhotoEducation } = require("../controllers/EducationController")
const { getAll, updateOne, deleteAll, deleteOne, updatePhoto } = require("../controllers/handleFactory")
const { restrictTo } = require("../middleware/restrictTo")
const upload = require("../middleware/uploadOption")
const Education = require("../models/EducationModel")

const router = require("express").Router()

router.route('/')
    .post( protect, restrictTo('admin'), upload.single('file'), createEducation)
    .get(getAll(Education))
    .delete(protect, restrictTo('admin'), deleteAll(Education))

router.route('/:id')
    .patch(protect, restrictTo('admin'),updateOne(Education))
    .delete(protect, restrictTo('admin'),deleteOne(Education))

router.route('/:id/photo')
    .patch(protect, restrictTo('admin'),upload.single('file'), updatePhoto(Education))

module.exports = router