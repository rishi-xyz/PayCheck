/**
 * steps:
 * 1.import mongoose
 * 2.connect to mongodb
 * 3.defineschema
 * 4.create model with that schema
 * 5.export
 */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Connect to mongodb
mongoose.connect(process.env.MONGODB_URI);

//Create a Schema for Users

//Simple solution
// const UserSchema = new mongoose.Schema({
//     username:String,
//     password:String,
//     firstname:String,
//     lastname:String
// });

//More Elegant solution
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true, //remove white spaces from both end of string
        minlength:3,
        maxlength:30
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    }
});


//Create a model from the Schema
const User = mongoose.model('User',UserSchema);


//Export user
module.exports = {
    User
};