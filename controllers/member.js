const { layout } = require("../utils")

const home = ((req, res) => {
    const { username } = req.session.user
    res.render("member/home", {
        ...layout,
        locals: {
            title: "Welcome",
            username
        }
    })
})

const requireLogin = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect("user/form", {
            ...layout,
            locals: {
                title: "Log In"
            }
        })
    }
}

module.exports = {
    home,
    requireLogin
}