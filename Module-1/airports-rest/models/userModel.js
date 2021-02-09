const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,

    },
    password: {
        type: String,

    },
});

UserSchema.pre("save", function (next) {
    // get the current user
    const user = this;

    // hash the password
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) console.log(err);
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;