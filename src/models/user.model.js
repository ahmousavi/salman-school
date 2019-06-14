const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
        // index: true,
    },
    father_name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: '',
    },
    national_code: {
        type: String,
        required: true,
        unique: true,
        // index: true,
    },
    password: {
        type: String,
        required: true,
        // minlength: [6, 'passwrod is short'],
    },
    token: {
        type: String,
        default: ''
    }
}, {
    collection: 'users',
    timestamps: {createdAt: true, updatedAt: false},
    discriminatorKey: 'user_type',
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            this.password = bcrypt.hashSync(this.password, 10);            
        }
        catch (err) {
            next(err);
        }
    }
    if (this.isModified('national_code')) {
        const ncCount = await mongoose.models.User.countDocuments({national_code: this.national_code})
        if (ncCount) {
            next({
                name: 'ValidatorError',
                message:'کد ملی تکراری است'
            })
        }
    }
    next()
})

userSchema.methods.checkPassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};



module.exports = mongoose.model('User', userSchema);