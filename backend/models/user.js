// import mongoose module
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

// create schema
const userSchema = mongoose.Schema ({
    firstName : String,
    lastName : String,
    email :{type: String, unique: true},
    tel : {type: Number, unique: true},
    pwd : String, 
    avatar : String,
    role: String,
    statut: String,
    
});
userSchema.plugin(uniqueValidator);
// create user name 
const user = mongoose.model("User", userSchema);

// make user importable
module.exports = user;