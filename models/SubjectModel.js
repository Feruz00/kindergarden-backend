const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title must be required']
    },
    description: {
        type:String,
        required: [true, 'Description must be required!']
    },
    url:{
        type:String,
        required: [true, 'Photo must be required!']
    }
})

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject