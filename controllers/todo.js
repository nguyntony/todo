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

const processTodo = async (req, res) => {
    const { task } = req.body
    const { id } = req.session.user
    const newTask = await Todo.create({
        task,
        isComplete: false,
        userID: id
    })
    res.redirect("/member/todo")
}

module.exports = {
    create,
    processTodo
}