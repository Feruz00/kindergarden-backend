const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
        unique:[true, 'Username already exists']
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'member'],
            message: 'Other type not a list'
        } 
    },
    password: {
        type: String
    },
    fullName:String,
    url: String,
    bio: String
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

module.exports = User