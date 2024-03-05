const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title must be required']
    },
    description: {
        type:String,
        required: [true, 'Description must be required!']
    },
    link:{
        type:String,
        required: [true, 'Link must be required!']    
    },
    url:{
        type:String,
        required: [true, 'Photo must be required!']
    }
})

const Education = mongoose.model('Education', educationSchema)

module.exports = Education