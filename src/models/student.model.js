const mongoose = require('mongoose')
const User = require('./user.model')

const studentSchema = new mongoose.Schema({
    total_average: {
        type: Number,
        default: 0,
        min: 0,
        max: 20
    },
    discipline_score: {
        type: Number,
        default: 20,
    },
    // class_number: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Class',
    //     default: null,
    // },
    // courses: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Course',
    //     default: null,
    // }]
})
const Student = User.discriminator('Student', studentSchema)
module.exports = mongoose.model('Student')