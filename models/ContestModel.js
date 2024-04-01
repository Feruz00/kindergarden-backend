const mongoose = require('mongoose')

const contestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name contest required']
    },
    users:{
        type: [String],
        ref: "User"
    },
    start: {
        type: Date,
        required: [true, 'The date of contest required']
    },
    duration: {
        type:Number, // secunds
        required: [true, 'The duration contest requiired']
    },
    allInTime: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const Contest = mongoose.model("Contest", contestSchema)

module.exports = Contest