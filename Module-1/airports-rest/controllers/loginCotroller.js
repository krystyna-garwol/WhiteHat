// const User = require('../models/userModel');
// const bcrypt = require('bcrypt');

const loginUser = (req, res) => {
    if (!req.session.userId) {
        req.session.userId = `${req.auth.user}123!`;
    }

    res.status(200).send(`You are logged in ${req.auth.user}. Now you can call other API routes.`)
}

module.exports = { loginUser }