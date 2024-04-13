const User = require('../models/UserModel')
const catchAsync = require('../utils/catchAsync')

const  checkStatus = catchAsync( async (req,res,next)=>{
    const user = await User.findOne({username: req.body.username})
    if(!user) return res.status(404).json({message: 'User not found'})

    if(!user.status){
        return res.status(403).json({message: 'User not access to system'})
    }
    next()
})

module.exports = checkStatus