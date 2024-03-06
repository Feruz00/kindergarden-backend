const User = require( "../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const passport = require('passport')

const register = catchAsync(
    async (req, res, next)=>{
        const {password, ...other} = req.body
        console.log(other)
        const user = await User.register({...other}, password) 
        res.json(user)
    }
)

const login = catchAsync(
    async (req,res,next)=>{
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        })

        req.login(newUser, err=>{
            if(err){
                return res.status(404).json(err)
            }
            else{
                passport.authenticate("local")(req,res,function(){
                    res.redirect('/api/auth')
                })
            }
        })
    }
)
const getUser = (req,res)=>{
    if(req.isAuthenticated()){
        return res.json(req.user)
    }
    return res.status(403).json({
        message: 'User not logged in'
    })
}

const logout = (req,res)=>{
    req.logout(function(err) {
        if (err) { 
            console.log(err)
            return res.status(400).json(err) }
        res.json();
    });
}

const changeInfo = catchAsync(
    async (req,res, next)=>{
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {new: true})
        res.json(user)
    }
)

const changePassword = catchAsync(
    async (req, res, next)=>{
        const {oldPassword, newPassword} = req.body;
        const user = await User.findById(req.user._id)
        await user.changePassword(oldPassword, newPassword, err=>{
            if(err) {
                if(err.name === 'IncorrectPasswordError'){
                    res.status(400).json({ success: false, message: 'Incorrect password' }); // Return error
                }else {
                    res.status(400).json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' });
                }
            }else {
             res.json({ success: true, message: 'Your password has been changed successfully' });
            }
        })
    }
)

const uploadPhoto = catchAsync(
    async (req, res, next)=>{
        const file = req.file.path;
        const user = await User.updateOne({ _id: req.user._id, }, { $set: { url: file } }, {new: true})
        return res.json(user)
    }
)

const protect = catchAsync(
    async (req,res, next)=>{
        if(req.isAuthenticated()){
           return next()
        }
        return res.status(403).json({message: 'Bu sahypa girip bilmeýärsiňiz'})
       
    }
)

module.exports = {
    getUser, login, logout, changeInfo, changePassword, uploadPhoto, register, protect
}
