const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Name of teacher must be required!']
    },
    job:{
        type:String,
        required: [true, 'Job must be required!']
    },
    description:{
        type:String,
        required: [true, 'Description must be required!']
    },
    
    url:{
        type:String,
        required: [true, 'Description must be required!']
    }
})

const Teacher = mongoose.model("Teacher", teacherSchema)


module.exports = Teacher