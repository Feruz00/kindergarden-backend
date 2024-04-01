const { protect, register } = require('../controllers/AuthController')
const { getAll, createOne, deleteAll, deleteOne, updateOne, getOne } = require('../controllers/handleFactory')
const { restrictTo } = require('../middleware/restrictTo')
const User = require('../models/UserModel')

const router = require('express').Router()

router.use(protect)
// Member bn islemek
router.use(restrictTo('admin')).route('/')
    .get(getAll(User))
    .post( register)
    // .delete( deleteAll(User, {role: 'member'}) )



router.route('/:id')
    .delete(restrictTo('admin'), deleteOne(User))
    .patch(restrictTo('admin'), updateOne(User))
    .get(getOne(User))

module.exports = router