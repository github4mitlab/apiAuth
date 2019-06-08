module.exports = {
    singUp: async (req, res, next) => {
        // console.log(req.value.body);
        console.log("signup");
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
