const { createTeacher } = require('../controllers/TeacherController')
const { getAll, deleteAll, getOne, updateOne , deleteOne, updatePhoto} = require('../controllers/handleFactory')
const upload = require('../middleware/uploadOption')
const Teacher = require('../models/TeacherModel')

const router = require('express').Router()

router.route('/')
    .post(upload.single('file'), createTeacher)
    .get(getAll(Teacher))
    .delete(deleteAll(Teacher))

router.route('/:id')
    .get(getOne(Teacher))
    .patch(updateOne(Teacher))
    .delete(deleteOne(Teacher))

router.route('/:id/img')
    .patch(upload.single('file'), updatePhoto)

module.exports = router