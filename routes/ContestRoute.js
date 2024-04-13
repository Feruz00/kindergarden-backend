const { protect } = require('../controllers/AuthController')
const { createOne, getAll, getOne, deleteOne } = require('../controllers/handleFactory')
const { restrictTo } = require('../middleware/restrictTo')
const Contest = require('../models/ContestModel')
const catchAsync = require('../utils/catchAsync')

const router = require('express').Router()

router.route('/')
    .post(protect, restrictTo('admin'), createOne(Contest))
    .get( protect, catchAsync( async (req,res,next)=>{
        // console.log()
        if(req.user.role === 'admin') return getAll(Contest, undefined, ['users'])(req, res, next) 
        else{
            const contests = await Contest.find({users: req.user._id}).populate('user')
            res.json({
                success: 'success',
                results: 1,
                data: contests})
        }
    } ) )

router.route('/:id')
    .get(protect, getOne(Contest, undefined, ['users']))
    .delete(protect, restrictTo('admin'), deleteOne(Contest))

module.exports = router
