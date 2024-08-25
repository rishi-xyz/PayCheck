const express = require("express");
const z = require("zod");
const { User } = require("../database");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const bcrypt = require("bcrypt");

const UserRouter = express.Router();

const SignupSchema = z.object({
    username:z.string().email(),
    password:z.string().min(6),
    firstname:z.string().max(50),
    lastname:z.string().max(50)
});

UserRouter.post("/signup",async(req,res)=>{
    const ParsedBody = SignupSchema.safeParse(req.body);
    if (!ParsedBody){
        return res.status(411).json({
            message:"Incorrect Inputs"
        })
    }
    const BodyUser =  await User.findOne({
        username:req.body.username
    })
    if(BodyUser._id){
        return res.status(411).json({
            message: "Username / Email already exists"
        });
    }

    const HashedPassword = await bcrypt.hash(req.body.password, 10);

    const CreateUser = await User.create({
        username:req.body.username,
        password:HashedPassword,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
    });

    const BodyUserId = BodyUser._id;
    const Token = jwt.sign({
        BodyUserId
    },JWT_SECRET);

    return res.status(200).json({
        message: "User created successfully",
        token: Token
    });
});

UserRouter.post("/signin", async(req,res)=>{

});

module.exports = UserRouter;