const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    review: {
        type:String,
        required: [true, 'Review must be required!']
    },
    name:{
        type:String,
        required: [true, 'Description must be required!']
    },
    job:{
        type:String,
        required: [true, 'Job must be required!']
    },
    url:{
        type:String,
        required: [true, 'Photo must be required!']
    }
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review