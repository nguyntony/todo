// this file will require from other router files and then have an export statement

// EXAMPLE
// module.exports = {
//     homeRouter: require('./home'),
//     productRouter: require('./products'),
// }

// NOTE
// the files in this folder will have to import express to create a router object and also import the corresponding controllers

// module.exports = {
//     homeRouter: require("./home"),
//     userRouter: require("./user")
// }

const express = require("express")
const router = express.Router();

router
    .use("/", require("./home"))
    .use("/user", require("./user"))
    .use("/member", require("./member"))
    .use("/member/todo", require("./todo"))

module.exports = router;

// the index router acts as the central routing system, here there is a router created by express and we are going to require the other routers that are also in the same directory so that we can use them.