const { layout } = require("../utils")

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

const list = (req, res) => {
    res.render("member/todo", {
        ...layout,
        locals: {
            title: "Todo List"
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