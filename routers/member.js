const express = require("express")
const router = express.Router()

const { memberController } = require("../controllers")

router
    .use(memberController.requireLogin)
    .get("/", memberController.home)

module.exports = router