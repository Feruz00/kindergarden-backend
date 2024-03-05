const mongoose = require('mongoose')

const galleryTypeSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, 'Title must be required!']
    }
})

const GalleryType = mongoose.model("Gallerytype", galleryTypeSchema)

module.exports = GalleryType