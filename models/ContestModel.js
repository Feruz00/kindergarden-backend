const mongoose = require('mongoose')

const contestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name contest required']
    },
    users:{
        type: [mongoose.Types.ObjectId],
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
    }, 
    lastTime:{
        type: Date,
        validate:{
            validator: function(val){
                return this.allInTime && val
            },
            message: 'Tell us lat time for start contest'
        }
    },
    status:{
        type: Boolean,
        default: true
    },
    isRemoveScore:{
        type: Boolean,
        default: false   
    },
    inCorrectCount:{
        type: Number,
        validate: {
            validator: function(val){
                if(this.isRemoveScore) return val>0
            },
            message: 'Show how many incorrent answers for remove corrects'
        },
        default: 0
    },
    correctCount:{
        type: Number,
        validate: {
            validator: function(val){
                if(this.isRemoveScore) return val>0
            },
            message: 'Show how many corrent answers for remove incorrects'
        },
        default: 0
    },
    isRandom: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})

const Contest = mongoose.model("Contest", contestSchema)

module.exports = Contest