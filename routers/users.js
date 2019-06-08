const express = require("express");
const router = express.Router();

const { validateBody, schemas } = require("../helpers/routeHelpers");
const userController = require("../controllers/users");

router.post("/signup", userController.singUp);
router.post("/signin", userController.singIn);
router.get("/secret", userController.secret);


module.exports = router;
