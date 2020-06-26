const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A user must have a username'],
        validate: {
            validator: value => /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(value),
            message: ({value}) => `${value} is not a valid username`
        }
    },
    displayName: {
        type: String,
        required: [true, 'A user must have a displayName'],
        maxLength: [20, 'User\'s display name\'s length must be lower than 20 or 20.'],
        minLength: [4, 'User\'s display name\'s length must be higher than 4 or 4.']
    },
    avatarImage: {
        type: String,
        default: 'default.jpg'
    },
    password: {
        type: String,
        required: [true, 'A User Must Have A password'],
        validate: {
            validator: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/.test(value),
            message: 'Invalid password.'
        },
        select: false
    },
    rote: {
        type: String,
        enum: {
            values: ['admin', 'user'],
            message: 'A User Must Have rote Value Set To admin Or user.'
        },
        default: 'user'
    },
    manager: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A User Must Have A manager.']
    }
});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.pre('findOneAndUpdate', async function(next) {
    if (!this._update.password) {
        return next();
    }
    this._update.password = await bcrypt.hash(this._update.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;