// const { route } = require("..")
const { createEducation, updatePhotoEducation } = require("../controllers/EducationController")
const { getAll, updateOne, deleteAll, deleteOne, updatePhoto } = require("../controllers/handleFactory")
const upload = require("../middleware/uploadOption")
const Education = require("../models/EducationModel")

const router = require("express").Router()

router.route('/')
    .post(upload.single('file'), createEducation)
    .get(getAll(Education))
    .delete(deleteAll(Education))

router.route('/:id')
    .patch(updateOne(Education))
    .delete(deleteOne(Education))

router.route('/:id/photo')
    .patch(upload.single('file'), updatePhoto(Education))

module.exports = router