const mongoose = require("mongoose");
//probably all wrong
const Schema = mongoose.Schema;
const dbConnectionString = "localhost:27017/practice3";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
