const { layout } = require("../utils")
const { Todo } = require("../models")

const home = (req, res) => {
    const { username } = req.session.user
    res.render("member/home", {
        ...layout,
        locals: {
            title: "Welcome",
            username
        }
    })
}

const requireLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/user/login")
    }
}

const list = async (req, res) => {
    const { id } = req.session.user
    const tasks = await Todo.findAll({
        where: {
            userID: id
        }
    })
    res.render("member/todo", {
        ...layout,
        locals: {
            title: "Todo List",
            tasks
        }
    })
}

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
}

module.exports = {
    home,
    requireLogin,
    list,
    logout
}