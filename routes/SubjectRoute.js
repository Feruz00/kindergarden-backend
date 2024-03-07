const { createSubject } = require('../controllers/SubjectController')
const { getAll, deleteAll, getOne, updateOne, deleteOne, updatePhoto } = require('../controllers/handleFactory')
const upload = require('../middleware/uploadOption')
const Subject = require('../models/SubjectModel')

const router = require('express').Router()

router.route('/')
    .post( upload.single('file'), createSubject)
    .get(getAll(Subject))
    .delete(deleteAll(Subject))

router.route('/:id')
    .get( getOne( Subject ) )
    .patch( updateOne(Subject) )
    .delete( deleteOne(Subject) )

router.route('/:id/img')
    .patch(upload.single('file'), updatePhoto(Subject))

module.exports = router