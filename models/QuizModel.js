const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
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

const Quiz = mongoose.model("Quiz", quizSchema)

module.exports = Quiz