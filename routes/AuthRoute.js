const router = require('express').Router()

const rateLimit = require('express-rate-limit');
const { protect, getUser, register, login, changeInfo, changePassword, uploadPhoto, logout } = require('../controllers/AuthController');
const { deleteOne } = require('../controllers/handleFactory');
const User = require('../models/UserModel');
const upload = require('../middleware/uploadOption');

const limiter = rateLimit({
    max: 5,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});

router.route('/')
    .get(protect, getUser)
    .post(register)
    .put(protect, changeInfo)
    .patch(protect, changePassword)

router.route('/login')
    .post(limiter, login)

router.route('/logout')
    .get(logout)
router.route('/img')
    .delete(deleteOne(User))
    .patch( upload.single('file'), uploadPhoto )
    // .delete(deleteOne(User))

module.exports = router