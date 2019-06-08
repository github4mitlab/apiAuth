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
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true
        }
    }
});


userSchema.pre('save', async function(next) {
    try{
        console.log("Entered");
        if(this.method !== 'local') {
            next();
        }

        // Generate a Salt
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(thih.local.password, salt);
        this.local.password = passwordHash;
        next();
    }
    catch(error) {
        next(error);
    };
});

userSchema.methods.isValidPassword = async function(newPassword) {
    try{
        return await bcrypt.compare(newPassword, this.local.password);
    }
    catch(error){
        throw new Error(error);
    }
}


// Create a Model
const User = mongoose.model("user", userSchema);

// Export the Model
module.exports = User;
