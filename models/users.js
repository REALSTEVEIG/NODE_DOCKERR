const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },

    email: {
        type: String,
    },

    password: {
        type: String,
    }
});


UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
    next();
});

UserSchema.methods.comparePassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
}

module.exports = mongoose.model("User", UserSchema);
