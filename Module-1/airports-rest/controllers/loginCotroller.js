const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const loginUser = (req, res) => {

    const { username, password } = req.body;

    const user = User.findOne({ username: username }, (err, user) => {
        if (!user)
            return res.status(404).send('No user found')

        bcrypt.compare(password, user.password, (err, same) => {
            if (!same) {
                return res.status(401).send(`Incorrect password`)
            }
            if (same) {
                req.session.userId = user._id
                return res.status(200).send(`You are logged in.`)
            }
        })

    })
}

module.exports = { loginUser }