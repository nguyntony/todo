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

// the db will have an entry of whether the task is complete or not, this will allow it to be managed and tracked of what tasks are still active. later the user will be able to have a button that will change the completed attribute to true, which we will then filter and show those in a separate list.

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

// confirmation page for whether we wish to delete the actual task or not. it will grab info/data from the req.body and req.params to use for the confirmation prompt.

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