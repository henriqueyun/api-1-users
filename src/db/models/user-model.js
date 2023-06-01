const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
});

const UserModel = mongoose.model("User", userSchema);

module.exports =  UserModel;