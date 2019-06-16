const express = require("express");
//const router = express.Router();
const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../passport");


const { validateBody, schemas } = require("../helpers/routeHelpers");
const userController = require("../controllers/users");
const passportSignIn = passport.authenticate('local', {session: false});
const passportJWT = passport.authenticate('jwt', {session:false});


//router.post("/signup", userController.signUp);
router.route("/signup")
    .post(validateBody(schemas.authSchema), userController.signUp);

router.route("/signin")
    .post(validateBody(schemas.authSchema), passportSignIn,  userController.signIn);

router.route("/secret").get(passportJWT, userController.secret);


router.route('/oauth/google')
    .post(passport.authenticate('googleToken', {session: false}),userController.googleOauth);

module.exports = router;
