const mongoose = require('mongoose');
const crypto = require('crypto');

// TODO: add more validators
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'standard', 'contributor']
    },
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = function (password) {

    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing password with 1000 iterations, 64 length and sha512 digest
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};

UserSchema.methods.validPassword = function (password) {
    const hashInput = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    return this.hash === hashInput;
};

module.exports = mongoose.model('User', UserSchema);
