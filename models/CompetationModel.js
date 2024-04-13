const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
    contest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contest",
        required: [true, 'The contest is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'The user is required']
    },
    startTime: {
        type: Date,
        required: [true, 'The start time is required']
    },
    endTime: {
        type: Date,
        required: [true, 'The end time is required']
    },
    quizzes: [{
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: [true, 'The quiz is required']
        },
        answers: [{
            selectedOption: {
                type: [String] // Store the selected option for multiple/single choice questions
            },
            enteredAnswer: {
                type: String // Store the entered answer for input type questions
            },
            isCorrect: {
                type: Boolean,
                default: false
            }
        }]
    }]
}, {
    timestamps: true
});

const Competition = mongoose.model("Competition", competitionSchema);

module.exports = Competition;
