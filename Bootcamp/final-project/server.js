const express = require("express")
const Handlebars = require("handlebars")
const expressHandlebars = require("express-handlebars")
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access")

const { Board, Task, User, db } = require("./models/models")
const { request } = require("express")

const app = express()


//Custom handlebars
const hbs = expressHandlebars.create({
    helpers: {
        dueColor: function (task) {
            var due = new Date(task.dueDate)
            var today = new Date()
            var diffTime = due.getTime() - today.getTime();
            var diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
            if(diffDays <= 1) {
                return '#e67465'
            } else if (diffDays > 1 && diffDays < 4) {
                return '#ffcc00'
            } else {
                return '#000'
            }
        },
        colorLabel: function (task) {
            var color = task.label
            if(task.label == 'g') {
                return '#6eb764'
            } else if (task.label == 'y') {
                return '#ffcc00'
            } else if (task.label == 'o') {
                return '#f6b62d'
            } else if (task.label == 'r') {
                return '#e5343a'
            } else if (task.label == 'b') {
                return '#4d79ff'
            } else {
                return
            }
        }
    },
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

hbs.handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

app.use(express.static('public'))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//-----ROUTES-------
// Render landing page
app.get(['/'], async (req, res) => {
    const users = await User.findAll({
        include: [{ model: Task, as: 'tasks' }],
        nest: true
    })
    res.render("home", { users: users })
})
// Create user
app.post(['/users/create'], async (req, res) => {
    const user = await User.create({ name: req.body.name, image: req.body.image })
    res.redirect(`/users/${user.id}/boards`)
})
//  Render profile page
app.get(['/users/:user_id/profilepage'], async (req, res) => {
    const user = await User.findByPk(req.params.user_id)
    const tasks = await Task.findAll({ where: { UserId: req.params.user_id } })
    res.render("user-profile", { user: user, tasks: tasks })
})
// Update user
app.post(['/users/:user_id/profilepage/edit'], async (req, res) => {
    const user = await User.findByPk(req.params.user_id)
    await user.update(req.body)
    res.redirect(`/users/${user.id}/boards`)
})
// Delete user
app.get(['/users/:user_id/profilepage/delete'], async (req, res) => {
    const user = await User.findByPk(req.params.user_id)
    await user.destroy()
    res.redirect('/')
})

// Render boards page
app.get(['/users/:user_id/boards'], async (req, res) => {
    const boards = await Board.findAll({
        include: 'tasks',
        nest: true
    })
    const user = await User.findByPk(req.params.user_id)
    const users = await User.findAll({
        include: 'tasks',
        nest: true
    })

    const avatarsArray = boards.map(async (b) => {
        const users = {};
        const board = await Board.findByPk(b.id)
        const tasks = await board.getTasks({ include: { model: User } })
        tasks
            .filter(task => task.User)
            .map((task) => (users[task.User.id] = task.User.image))
        return {
            boardId: b.id,
            users: users
        }
    })
    const avatars = await Promise.all(avatarsArray)
    res.render("all-boards", { users, boards, user, avatars })
})
//Render individual board page
app.get('/users/:user_id/boards/:board_id', async (req, res) => {
    const board = await Board.findByPk(req.params.board_id)
    const users = await User.findAll({
        include: 'tasks',
        nest: true
    })
    const tasks = await board.getTasks({ include: { model: User } })
    const user = await User.findByPk(req.params.user_id)
    res.render('board', { board, user, users, tasks })
})
// Create board
app.post(['/users/:user_id/boards/create'], async (req, res) => {
    const user = await User.findByPk(req.params.user_id)
    const board = await Board.create({ title: req.body.title, image: req.body.image })
    res.redirect(`/users/${user.id}/boards`)
})
// Update board
app.post(['/users/:user_id/boards/:board_id/edit'], async (req, res) => {
    const board = await Board.findByPk(req.params.board_id)
    const user = await User.findByPk(req.params.user_id)
    await board.update(req.body)
    res.redirect(`/users/${user.id}/boards/${board.id}`)
})
// Delete board
app.get(['/users/:user_id/boards/:board_id/delete'], async (req, res) => {
    const user = await User.findByPk(req.params.user_id)
    const board = await Board.findByPk(req.params.board_id)
    await board.destroy()
    res.redirect(`/users/${user.id}/boards`)
})
//Create task
app.post('/users/:user_id/boards/:board_id/tasks/create', async (req, res) => {
    const board = await Board.findByPk(req.params.board_id)
    const user = await User.findByPk(req.params.user_id)
    if (req.body.selectpicker == "no") {
        await Task.create({ desc: req.body.desc, status: 0, dueDate: req.body.dueDate, label: req.body.label, BoardId: board.id, UserId: null })
    } else if(req.body.label =='n') {
        const selectUser = await User.findByPk(req.body.selectpicker)
        await Task.create({ desc: req.body.desc, status: 0, dueDate: req.body.dueDate, label: null, BoardId: board.id, UserId: selectUser.id })
    } else {
        const selectUser = await User.findByPk(req.body.selectpicker)
        await Task.create({ desc: req.body.desc, status: 0, dueDate: req.body.dueDate, label: req.body.label, BoardId: board.id, UserId: selectUser.id })
    }
    res.redirect(`/users/${user.id}/boards/${board.id}`)
})
//Update tasks
app.post(['/users/:user_id/boards/:board_id/tasks/:task_id/edit'], async (req, res) => {
    const task = await Task.findByPk(req.params.task_id)
    const board = await Board.findByPk(req.params.board_id)
    const user = await User.findByPk(req.params.user_id)
    if (req.body.selectpicker == "no") {
        await task.update({ desc: req.body.desc, status: req.body.move, dueDate: req.body.dueDate, label: req.body.label, BoardId: board.id, UserId: null })
    } else if(req.body.label == 'n') {
        const selectUser = await User.findByPk(req.body.selectpicker)
        await task.update({ desc: req.body.desc, status: req.body.move, dueDate: req.body.dueDate, label: null, BoardId: board.id, UserId: selectUser.id })
    } else {
        const selectUser = await User.findByPk(req.body.selectpicker)
        await task.update({ desc: req.body.desc, status: req.body.move, dueDate: req.body.dueDate, label: req.body.label, BoardId: board.id, UserId: selectUser.id })
    }
    res.redirect(`/users/${user.id}/boards/${board.id}`)
})
//Delete tasks
app.get(['/users/:user_id/boards/:board_id/tasks/:task_id/delete'], async (req, res) => {
    const board = await Board.findByPk(req.params.board_id)
    const user = await User.findByPk(req.params.user_id)
    const task = await Task.findByPk(req.params.task_id)
    await task.destroy()
    res.redirect(`/users/${user.id}/boards/${board.id}`)
})
//Update status
app.post('/users/:task_id/updatetask', async (req, res) => {
    const task = await Task.findByPk(req.params.task_id)
    await task.update({ status: req.body.status })
    res.send()
})


//this is the point where the server is initialised. 
app.listen(3000, () => {
    db.sync().then(async () => {
        const boards = await Board.findAll()

        if (boards.length > 0) {
            return
        }
        const sarah = await User.create({ "name": "Sarah", "image": "https://avatarfiles.alphacoders.com/147/thumb-1920-14715.gif?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" })
        const krystyna = await User.create({ "name": "Krystyna", "image": "https://avatarfiles.alphacoders.com/798/thumb-1920-79894.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"})
        const josie = await User.create({ "name": "Josie", "image": "https://avatarfiles.alphacoders.com/150/150224.gif?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" })
        const board1 = await Board.create({ "title": "Holiday Plan", "image": "https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" })
        await Task.create({ "desc": "Snorkelling", "status": 0, "dueDate": "", "label": "", "BoardId": board1.id, UserId: sarah.id })
        await Task.create({ "desc": "Swimming", "status": 0, "dueDate": "", "label": "", "BoardId": board1.id, UserId: krystyna.id })
        await Task.create({ "desc": "Chilling", "status": 0, "dueDate": "", "label": "", "BoardId": board1.id, UserId: josie.id })
        const board2 = await Board.create({ "title": "Cat Duties", "image": "https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" })
        await Task.create({ "desc": "Feed the cat", "status": 0, "dueDate": "", "label": "", "BoardId": board2.id, UserId: krystyna.id })
        await Task.create({ "desc": "Feed the cat again", "status": 0, "dueDate": "", "label": "", "BoardId": board2.id, UserId: josie.id })
        await Task.create({ "desc": "Don't forget to feed the cat", "status": 0, "dueDate": "", "label": "", "BoardId": board2.id, UserId: sarah.id })

    }).catch(console.error)
    console.log('port = ', 3000)
})