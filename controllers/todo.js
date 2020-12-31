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

const editForm = async (req, res) => {
    const { todoID } = req.params
    const todo = await Todo.findOne({
        where: {
            id: todoID
        }
    })

    res.render("member/editForm", {
        ...layout,
        locals: {
            title: "Update task",
            currentValue: todo.task
        }
    })
}

const processEditForm = async (req, res) => {
    const { todoID } = req.params
    const { update } = req.body
    const todo = await Todo.update({
        task: update
    }, {
        where: {
            id: todoID
        }
    })
    res.redirect("/member/todo")
}

const delForm = async (req, res) => {
    const { todoID } = req.params
    const todo = await Todo.findOne({
        where: {
            id: todoID
        }
    })

    res.render("member/delete", {
        ...layout,
        locals: {
            title: "Delete task",
            todo,
            errorMsg: ""

        }
    })
}

const processDelForm = async (req, res) => {
    const { confirmation } = req.body
    const { todoID } = req.params

    // this is the delete confirmation form
    if (todoID === confirmation) {
        const todo = await Todo.destroy({
            where: {
                id: todoID
            }
        })
        res.redirect("/member/todo")
    } else {
        const todo = await Todo.findOne({
            where: {
                id: todoID
            }
        })
        res.render("member/delete", {
            ...layout,
            locals: {
                title: "Delete task",
                todo,
                errorMsg: `Input: <strong>${confirmation}</strong><br>The ID does not match. Please try again.`
            }
        })
    }
}

const completed = async (req, res) => {
    // completed button for list items
    const { todoID } = req.params
    const todo = await Todo.update({
        isComplete: true
    }, {
        where: {
            id: todoID
        }
    })
    res.redirect("/member/todo")
}

module.exports = {
    create,
    processTodo,
    editForm,
    processEditForm,
    delForm,
    processDelForm,
    completed
}