const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    question: {
        type:String,
        required: [true, 'The question required']
    },
    option: {
        type: String,
        enum:{
            values: ['multiple-choice', 'input', 'single-choice'],
            message: 'Only have these types answers'
        
        }
    },
    correctAnswer:{
        type: [String],
        required: [true, 'Answer required']
    }
})

const Test = mongoose.model("Test", testSchema)

module.exports = Test