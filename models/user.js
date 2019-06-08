const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//Create a Shcema
const userSchema = new Schema({
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     lowercase: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // }
    method: {
        type: String, 
        enum: [ 'local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String, 
            lowercase: true
        },
        password : {
            type: String
        }
    },
    google: {
        
    },
    facebook: {

    }
});


// Create a Model
const User = mongoose.model("user", userSchema);

// Export the Model
module.exports = User;
