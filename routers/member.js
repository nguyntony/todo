const express = require("express")
const router = express.Router()

const { memberController } = require("../controllers")


router
    .use(memberController.requireLogin)
    .get("/", memberController.home)
    .get("/todo", memberController.list)
    .get("/logout", memberController.logout)

module.exports = router