const { protect } = require('../controllers/AuthController')
const { createTeacher } = require('../controllers/TeacherController')
const { getAll, deleteAll, getOne, updateOne , deleteOne, updatePhoto} = require('../controllers/handleFactory')
const { restrictTo } = require('../middleware/restrictTo')
const upload = require('../middleware/uploadOption')
const Teacher = require('../models/TeacherModel')

const router = require('express').Router()

router.route('/')
    .post(protect, restrictTo('admin'), upload.single('file'), createTeacher)
    .get(getAll(Teacher))
    .delete(protect, restrictTo('admin'), deleteAll(Teacher))

router.route('/:id')
    .get(getOne(Teacher))
    .patch( protect, restrictTo('admin'), updateOne(Teacher))
    .delete(protect, restrictTo('admin'), deleteOne(Teacher))

router.route('/:id/img')
    .patch(protect, restrictTo('admin'), upload.single('file'), updatePhoto(Teacher))

module.exports = router