const express = require("express");
const UserRouter = require("./user");
const AccountRouter = require("./account");

//Single routing
const rootRouter = express.Router();

// Multiple routing
// const router1 = express.Router();
// const router2 = express.Router();
// const router3 = express.Router();

rootRouter.use("/user",UserRouter);//anything to /api/v1/user follow UserRouter
rootRouter.use("/account",AccountRouter);//anything to /api/v1/account

module.exports = rootRouter;