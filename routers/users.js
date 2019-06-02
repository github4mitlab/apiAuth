const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");

router.post("/singup",userController.singUp);
router.post("/singin",userController.singIn);
router.get("/secret",userController.secret);
// router.route("/singin")
//     .post(userController.singIn);

// router.route("/secret")
//     .get(userController.secret);

module.exports = router;
