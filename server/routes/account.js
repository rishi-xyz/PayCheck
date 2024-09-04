const express  = require("express");
const { authMiddleware } = require("../middlewares/middleware");
const { Account } = require("../database/database");
const z = require("zod");
const { default: mongoose } = require("mongoose");

const AccountRouter = express.Router();

AccountRouter.get("/balance",authMiddleware,async(req,res)=>{
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

AccountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const ParsedBody = TransferSchema.safeParse(req.body);
    if (!ParsedBody.success) {
        return res.status(400).json({
            message: "Incorrect Inputs",
            error: ParsedBody.error,
        });
    }
    const { to: To, amount: Amount } = ParsedBody.data;
    const TransactionSession = await mongoose.startSession();
    TransactionSession.startTransaction();
    try {
        const UserAccount = await FetchAccountById(req.authenticateduserId);
        if (!UserAccount) {
            throw new Error("Account not Found");
        }
        if (UserAccount.balance < Amount) {
            return res.status(400).json({
                message: "Insufficient balance",
            });
        }
        const ToAccount = await FetchAccountById(To);
        if (!ToAccount) {
            throw new Error("Invalid Account");
        }
        // Subtract from user account
        const userUpdateResult = await Account.updateOne(
            { userId: req.authenticateduserId },
            { $inc: { balance: -Amount } }
        ).session(TransactionSession);
        console.log("User account update result:", userUpdateResult);

        // Add to the other account
        const toAccountUpdateResult = await Account.updateOne(
            { userId: To },
            { $inc: { balance: Amount } }
        ).session(TransactionSession);
        console.log("To account update result:", toAccountUpdateResult);

        await TransactionSession.commitTransaction();

        const Aftercommit = await FetchAccountById(req.authenticateduserId);
        console.log("User acc after commit", Aftercommit);
        const ToaccAftercommit = await FetchAccountById(To);
        console.log("To acc after commit", ToaccAftercommit);

        return res.status(200).json({
            message: "Transfer Successful",
        });
    } catch (error) {
        await TransactionSession.abortTransaction();
        return res.status(400).json({ message: error.message || "Transfer failed" });
    } finally {
        TransactionSession.endSession();
    }
});

async function FetchAccountById(UserId){
    const ObjId = new mongoose.Types.ObjectId(UserId);
    const Accountfetched = await Account.findOne({ userId: ObjId });
    return Accountfetched;
}


module.exports = AccountRouter;