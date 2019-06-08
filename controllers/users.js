const JWT = require("jsonwebtoken");
const userModel = require("../models/user");

const { JWT_SECRET } = require("../config");

signToken = user => {
    return JWT.sign({
        iss: "mayLee",
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() +1) // 현재 시간 더하기 하루
    }, JWT_SECRET);
};

module.exports = {
    singUp: async (req, res, next) => {
        const { email, password } = req.body; 
        const foundUser = await userModel.findOne({email});
        if(foundUser) {
            return res.status(403).json({ error: "Email is already in use"});
        }
        //Create a new user
        const newUser = new userModel({ email, password});
        await newUser.save();

        // Generate the token
        const token = signToken(newUser);

        // Respond with token : 파싱확인은 https://jwt.io/
        res.status(200).json({
            user: token
        });
    },
    singIn: async (req, res, next) => {
        // console.log("SignIn");
        const loginInfo = {
            email: req.body.email,
            password: req.body.password
        };

        res.status(200).json({
           msg : "Success" ,
           loginInfo: loginInfo
        });
    },
    secret: async (req, res, next) => {
        console.log("Secret");
    }
};
