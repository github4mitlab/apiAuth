const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("../passport");


const { validateBody, schemas } = require("../helpers/routeHelpers");
const userController = require("../controllers/users");
const passportSingIn = passport.authenticate('local', {session: false});
const passportJWT = passport.authenticate('jwt', {session:false});


router.post("/signup", validateBody(schemas.authSchema), userController.singUp);
router.post("/signin", validateBody(schemas.authSchema), passportSingIn,  userController.singIn);
router.get("/secret", passportJWT , userController.secret);

router.route('/oauth/google')
    .post(passport.authenticate('googleToken', {session: false}),userController.googleOauth);

module.exports = router;
