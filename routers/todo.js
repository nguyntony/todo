const express = require("express");
const router = express.Router();

const { todoController } = require("../controllers");

router
    .get("/create", todoController.create)
    .post("/create", todoController.processTodo)
    .get("/:todoID/edit", todoController.editForm)
    .post("/:todoID/edit", todoController.processEditForm)
    .get("/:todoID/delete", todoController.delForm)
    .post("/:todoID/delete", todoController.processDelForm)
    .post("/:todoID/completed", todoController.completed)

module.exports = router;
