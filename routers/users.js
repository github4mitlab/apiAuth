const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("../passport");


const { validateBody, schemas } = require("../helpers/routeHelpers");
const userController = require("../controllers/users");

router.post("/signup", validateBody(schemas.authSchema), userController.singUp);
router.post("/signin", userController.singIn);
router.get("/secret", passport.authenticate('jwt', {session:false}), userController.secret);


module.exports = router;
