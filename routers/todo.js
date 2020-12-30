const express = require("express")
const router = express.Router()

const { todoController } = require("../controllers")

router
    .get("/create", todoController.create)

module.exports = router