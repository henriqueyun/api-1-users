const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [
            true,
            "name is required"
        ]
    },
    email: {
        type: String,
        required: [
            true,
            "email is required"
        ]
    },
    phone: {
        type: Number,
        required: [
            true,
            "phone is required"
        ]
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports =  UserModel;