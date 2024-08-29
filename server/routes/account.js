const express  = require("express");
const { authMiddleware } = require("./middleware");
const { Account } = require("../database");
const z = require("zod");
const { default: mongoose } = require("mongoose");

const AccountRouter = express.Router();

AccountRouter.get("/balance",authMiddleware,async (req,res)=>{
    try {
        console.log("req user in account.js = ", req.userId)
        const userId = req.userId
        console.log("userid after const = ", userId)
        const FetchedAccount = await FetchAccountById(userId);
        console.log("Fetched account = ", FetchedAccount)
        if(!FetchedAccount){
            return res.status(404).json({message:"Account not found"});
        }
        return res.status(200).json({
            balance:FetchedAccount.balance
        });
    }catch(error){
        return res.status(500).json({message:"Error fetching account"});
    }
});

const TransferSchema = z.object({
    to:z.string().email(),
    amount:z.number().positive()
}); 

AccountRouter.post("/transfer",authMiddleware,async(req,res)=>{
    const ParsedBody = TransferSchema.safeParse(req.body);
    if(!ParsedBody.success){
        return res.status(400).json({
            message:"Incorrect Inputs"
        });
    }
    const { to: To, amount: Amount } = ParsedBody.data;
    const TransactionSession = await mongoose.startSession();
    TransactionSession.startTransaction();
    try{
        const UserAccount = await FetchAccountById(req.userId);
        if(!UserAccount){
            throw new Error("Account not Found");
        }
        if(UserAccount.balance < req.body.amount){
            return res.status(400).json({
                message:"Insufficient balance"
            });
        }
        const ToAccount = await FetchAccountById(To);
        if(!ToAccount){
            throw new Error("Invalid Account");
        }
        await Account.updateOne({UserId:req.userId},{$inc:{balance:-Amount}}).session(TransactionSession);
        await Account.updateOne({UserId:To},{$inc:{balance:Amount}}).session(TransactionSession);
        await TransactionSession.commitTransaction();

        return res.status(200).json({
            message:"Transfer Successful"
        });
        
    }catch(error){
        await TransactionSession.abortTransaction();
        return res.status(400).json({message:error.message || "Transfer failed"});
    }finally{
        TransactionSession.endSession();
    }
});

async function FetchAccountById(UserId) {
    console.log("in function user id:", UserId);
    const Accountfetched = await Account.findOne({ _id: mongoose.Types.ObjectId(UserId)});
    console.log("account fetched inside function = ", Accountfetched);
    return Accountfetched;
}


module.exports = AccountRouter;