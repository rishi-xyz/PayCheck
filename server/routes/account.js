const express  = require("express");
const { authMiddleware } = require("./middleware");
const { Account } = require("../database");
const z = require("zod");
const { default: mongoose } = require("mongoose");

const AccountRouter = express.Router();

AccountRouter.get("/balance",authMiddleware,async (req,res)=>{
    try {
        const userId = req.authenticateduserId;
        const FetchedAccount = await FetchAccountById(userId);
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
    to:z.string(),
    amount:z.number().positive()
}); 

AccountRouter.post("/transfer",authMiddleware,async(req,res)=>{
    const ParsedBody = TransferSchema.safeParse(req.body);
    if(!ParsedBody.success){
        return res.status(400).json({
            message:"Incorrect Inputs",
            error:ParsedBody.error
        });
    }
    const { to: To, amount: Amount } = ParsedBody.data;
    const TransactionSession = await mongoose.startSession();
    TransactionSession.startTransaction();
    console.log("checkpoint 1");
    try{
        const UserAccount = await FetchAccountById(req.authenticateduserId);
        console.log("checkpoint 2");
        if(!UserAccount){
            throw new Error("Account not Found");
        }
        if(UserAccount.balance < req.body.amount){
            return res.status(400).json({
                message:"Insufficient balance"
            });
        }
        console.log("checkpoint 3");
        const ToAccount = await FetchAccountById(To);
        console.log("checkpoint 4");
        if(!ToAccount){
            throw new Error("Invalid Account");
        }
        console.log("checkpoint 5");
        await Account.updateOne({UserId:req.authenticateduserId},{$inc:{balance:(balance-Amount)}}).session(TransactionSession);
        console.log("checkpoint 6");
        await Account.updateOne({UserId:To},{$inc:{balance:balance+Amount}}).session(TransactionSession);
        console.log("checkpoint 7");
        await TransactionSession.commitTransaction();
        console.log("checkpoint 8");
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

async function FetchAccountById(UserId){
    console.log("userid input is =",UserId)
    const ObjId = new mongoose.Types.ObjectId(UserId);
    console.log("objid =",ObjId)
    const Accountfetched = await Account.findOne({ userId: ObjId });
    console.log("Account fetched is = ",Accountfetched)
    return Accountfetched;
}


module.exports = AccountRouter;