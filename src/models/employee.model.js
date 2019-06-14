const mongoose = require('mongoose')
const User = require('./user.model')

const EmployeeSchema = new mongoose.Schema({
    year_employed: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    // letters: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Letter'
    // }
})
const Employee = User.discriminator('Employee', EmployeeSchema)
module.exports = mongoose.model('Employee')