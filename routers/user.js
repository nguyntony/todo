const express = require("express")
const router = express.Router()

const { userController } = require("../controllers")

router
    .get("/signup", userController.signUp)
    .get("/login", userController.login)
    .post("/signup", userController.processSignUp)
    .post("/login", userController.processLogin)


module.exports = router