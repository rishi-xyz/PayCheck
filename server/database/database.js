/**
 * steps:
 * 1.import mongoose
 * 2.connect to mongodb
 * 3.defineschema
 * 4.create model with that schema
 * 5.export
 */
const mongoose = require("mongoose");
require('dotenv').config();

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
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        validate:{
            validator:function(v){
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
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

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type: Number,
        required: true
    }
});

//Create a model from the Schema
const User = mongoose.model('User',UserSchema);
const Account = mongoose.model("Account",AccountSchema);


//Export user
module.exports = {
    User,
    Account
}