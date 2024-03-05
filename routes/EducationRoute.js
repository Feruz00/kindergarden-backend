// const { route } = require("..")
const { createEducation, updatePhotoEducation } = require("../controllers/EducationController")
const { getAll, updateOne, deleteAll } = require("../controllers/handleFactory")
const upload = require("../middleware/uploadOption")
const Education = require("../models/EducationModel")

const router = require("express").Router()

router.route('/')
    .post(upload.single('file'), createEducation)
    .get(getAll(Education))
    .delete(deleteAll(Education))

router.route('/:id')
    .patch(updateOne(Education))

router.route('/:id/photo')
    .patch(updatePhotoEducation)

module.exports = router