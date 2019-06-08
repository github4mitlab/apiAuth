const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const { JWT_SECRET } = require("./config");
const userModel = require("./models/user");


// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try{
        // Find User specific in token
        const user = await userModel.findById(payload.sub);

        // If user don'nt exist, handle it
        if(!user) {
            return done(null, false);
        }
        done(null, user);
    }
    catch (error) {
        done(error.false);
    }
}));

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done ) => {
    //find the user given the email
    const user = await userModel.findOne({email});

    // If not, handle it!!
    if(!user) {
        return done(null, false);
    };

    // Check if the password is correct
    // If not, handle it
    // Otherwise, return the user
}))