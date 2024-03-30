const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
    // author:String,
    title:{
        type:String,
        required: [true, 'Title must be required!']
    },
    picture:String,
    url:{
        type:String,
        required: [true, 'Url must be required!']
    },
    images:[String],
    type:{
        type: mongoose.Types.ObjectId,
        ref: 'Gallerytype'
    },
    // images: [String]
})

const Gallery = mongoose.model("Gallery", gallerySchema)

module.exports = Gallery