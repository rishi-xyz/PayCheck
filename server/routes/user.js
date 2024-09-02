const express = require("express");
const z = require("zod");
const { User, Account } = require("../database/database");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config/config");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middlewares/middleware");

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
            userId:CreateUser._id,
            balance:1+Math.random()*10000
        });
    
        const Token = jwt.sign({ UserId: CreateUser._id }, JWT_SECRET.JWT_SECRET);
    
        return res.status(200).json({
            message: "User created successfully",
            token: Token
        });
    }catch(error){
        console.error('Error during signup:', error);
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

    const Token = jwt.sign({ userId: InputUser._id }, JWT_SECRET.JWT_SECRET);
    
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

UserRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        // Use a case-insensitive search with the regex and escape special characters in the filter
        const escapedFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters
        const users = await User.find({
            $or: [
                { firstname: { "$regex": escapedFilter, "$options": "i" } },
                { lastname: { "$regex": escapedFilter, "$options": "i" } }
            ]
        });

        return res.json({
            users: users.map(user => ({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id,
            }))
        });
    }catch(err){
        console.error('Error fetching users:', err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

module.exports = UserRouter;