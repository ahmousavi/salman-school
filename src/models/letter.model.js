const mongoose = require('mongoose')

const letterSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reciver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        default: 'بدون موضوع'
    },
    text: {
        type: String,
        required: true,
    },
    attachment: {
        type: String,
        default: null,
    }
}, {
    collection: 'letters',
    timestamps: {createdAt: true, updatedAt: true},
})


module.exports = mongoose.model('Letter', letterSchema);