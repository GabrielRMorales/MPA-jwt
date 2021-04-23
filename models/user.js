const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = mongoose.createConnection("mongodb://localhost:27017/practice3", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = connection.model("User", userSchema);
module.exports = User;
