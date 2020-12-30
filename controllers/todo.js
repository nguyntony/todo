const { layout } = require("../utils")
const { Todo } = require("../models")

const create = (req, res) => {
    res.render("member/form", {
        ...layout,
        locals: {
            title: "Create Task"
        }
    })
}

module.exports = {
    create
}