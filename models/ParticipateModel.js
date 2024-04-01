const mongoose = require('mongoose')

const partipcateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    contest: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    start:{
        type: Date,
    }
},{
    timestamps: true
})

const Partipcate = mongoose.model("Partipcate", partipcateSchema)

module.exports = Partipcate