const express = require("express");
const router = express.Router();

const { todoController } = require("../controllers");

router
    .get("/create", todoController.create)
    .post("/create", todoController.processTodo);

module.exports = router;
