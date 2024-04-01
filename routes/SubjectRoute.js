const { protect } = require('../controllers/AuthController')
const { createSubject } = require('../controllers/SubjectController')
const { getAll, deleteAll, getOne, updateOne, deleteOne, updatePhoto } = require('../controllers/handleFactory')
const { restrictTo } = require('../middleware/restrictTo')
const upload = require('../middleware/uploadOption')
const Subject = require('../models/SubjectModel')

const router = require('express').Router()

router.route('/')
    .post(protect, restrictTo('admin'), upload.single('file'), createSubject)
    .get(getAll(Subject))
    .delete(protect, restrictTo('admin'), deleteAll(Subject))

router.route('/:id')
    .get( getOne( Subject ) )
    .patch(protect,  restrictTo('admin'), updateOne(Subject) )
    .delete( protect, restrictTo('admin'), deleteOne(Subject) )

router.route('/:id/img')
    .patch(protect, restrictTo('admin'), upload.single('file'), updatePhoto(Subject))

module.exports = router