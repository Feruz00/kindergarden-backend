const mongoose = require('mongoose')

const aboutusSchema = new mongoose.Schema({
    header:{
        type: String,
        required: [true, 'Header required']
    },
    title:{
        type:String,
        required:[true, 'Title required']
    },
    content:{
        type:String,
        required:[true, 'Content required']   
    },
    list:[String],
    mainImg:{
        type:String,
        required:[true, 'Main image url required']
    },
    smallImg:String
})

const About = mongoose.model('About', aboutusSchema)

module.exports = About;