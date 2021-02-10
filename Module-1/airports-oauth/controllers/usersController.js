const User = require('../models/userModel');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const getUsers = async (req, res) => {
    const allUsers = await User.find({})
    res.status(200).send(allUsers)
}

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).send(user)
}

const updateUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) return next(err);
        password = req.body.password;
        user.save()
    })
    res.status(200).send(updatedUser)
}

const deleteUser = async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedUser)
}

const addUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    await user
        .save()
        .then(data => {
            res.status(200).send("Created user: " + data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured while creating the user",
            })
        })
}

module.exports = { getUsers, getUser, deleteUser, updateUser, addUser }