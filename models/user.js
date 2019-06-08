const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create a Shcema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});


// Create a Model
const User = mongoose.model("user", userSchema);

// Export the Model
module.exports = User;
