const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const config = require("./config");
const userModel = require("./models/user");
const GooglePlusTokenStrategy = require("passport-google-plus-token");


// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    // secretOrKey: JWT_SECRET
    secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    try{
        // Find User specific in token
        const user = await userModel.findById(payload.sub);

        // If user don't exist, handle it
        if(!user) {
            return done(null, false);
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done ) => {
    try{
            //find the user given the email
        const user = await userModel.findOne({"local.email" : email });

        // If not, handle it!!
        if(!user) {
            return done(null, false);
        }

        // Check if the password is correct
        console.log(password);
        const isMatch = await user.isValidPasswrod(password);
        
        // If not, handle it
        if(!isMatch){
            return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);

    }
    catch(error) {
        done(error, false);
    }
}));

// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clinetSecret
}, async(accessToken, reqfreshToken, profile, done) => {
    try{
        console.log(profile);
        console.log(accessToken);
        console.log(reqfreshToken);

        const existingUser = await userModel.findOne({"google.id" : profile.id });
        if(existingUser) {
            return done(null, existingUser);
        }

        const newUser = new userModel({
            method: "google", 
            google : {
                id: profile.id,
                email: profile.emails[0].value
            }
        });
        await newUser.save();
        done(null, newUser);
    }
    catch(error){
        done(error, false, error.message);
    };
}));


