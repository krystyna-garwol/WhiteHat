
const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.status(200).send('You have been logged out.')
    })
}

module.exports = { logoutUser }