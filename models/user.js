const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();

const connection = mongoose.createConnection(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

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
