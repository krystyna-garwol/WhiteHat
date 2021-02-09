const User = require('../models/userModel');
const bcrypt = require('bcrypt');


const customAuthoriser = async (username, password, cb) => {
    const user = await User.findOne({ username: username })

    if (user) {
        bcrypt.compare(password, user.password, (err, res) => {
            userID = user._id;
            return cb(null, res);
        })
    } else {
        return cb(null, false);
    }
}

module.exports = { customAuthoriser }