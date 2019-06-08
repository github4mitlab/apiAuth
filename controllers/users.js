const userModel = require("../models/user");

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

        // Respond with token
        res.status(200).json({
            user: 'Created'
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
