const express = require("express");
const z = require("zod");
const { User, Account } = require("../database");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("./middleware");

const app = express();
app.use(express.json());

const UserRouter = express.Router();

const SignupSchema = z.object({
    username:z.string().email(),
    password:z.string().min(6),
    firstname:z.string().max(50),
    lastname:z.string().max(50)
});


UserRouter.post("/signup",async(req,res)=>{
    const ParsedBody = SignupSchema.safeParse(req.body);
    console.log("Parsed body",ParsedBody);
    if (!ParsedBody.success){
        console.log("Validation Errors:", ParsedBody.error);
        return res.status(411).json({
            message:"Incorrect Inputs"
        })
    }
    try {
        const BodyUser =  await User.findOne({
            username:req.body.username
        })
        if(BodyUser){
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
    
        await Account.create({
            UserId:CreateUser._id,
            balance:1+Math.random()*10000
        });
    
        const Token = jwt.sign({ userId: CreateUser._id }, JWT_SECRET);
    
        return res.status(200).json({
            message: "User created successfully",
            token: Token
        });
    }catch(error){
        console.error('Error during signup:', err);
        return res.status(500).json({
            message: "Internal Server Error"
        });        
    }
});


UserRouter.post("/signin", async (req,res)=>{
    const InputUser = await User.findOne({username:req.body.username});

    if (!InputUser) {
        return res.status(401).json({
            message: "Invalid username or password",
        });
    }
    const PasswordMatch = await bcrypt.compare(req.body.password,InputUser.password);
    if(!PasswordMatch){
        return res.status(411).json({
            message: "Wrong Password"
        })
    }

    const Token = jwt.sign({ userId: InputUser._id }, JWT_SECRET);
    
    return res.status(200).json({
        message:"Login successful",
        token: Token
    });
});

const UpdateSchema = z.object({
    password:z.string().min(6).optional(),
    firstname:z.string().max(50).optional(),
    lastname:z.string().max(50).optional()
});

UserRouter.put("/update",authMiddleware,async (req,res) =>{
    const Parsedbody = UpdateSchema.safeParse(req.body);
    if(!Parsedbody.success){
        return res.status(411).json({
            message:"Error while updating information"
        });
    }
    await User.updateOne({_id:req.userId},req.body);
    return res.status(200).json({
        message:"Updated Successfully"
    });
});

UserRouter.get("/bulk", async (req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstname:{
                "$regex" : filter
            }
        },{
            lastname:{
                "$regex":filter
            }
        }]
    })
    return res.json({user:users.map(user=>({
        username:user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        _id:user._id,
    }))})
});

module.exports = UserRouter;