const mongoose = require('mongoose')

const contestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name contest required']
    },
    key:{
        type: String,
        required:[true, 'The key required']
    }
},{
    timestamps: true
})

const Contest = mongoose.model("Contest", contestSchema)

module.exports = Contest