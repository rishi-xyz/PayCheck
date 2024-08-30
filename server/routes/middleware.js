const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({
            message:"Authorization header missing or invalid"
        });
    }

    const token = authHeader.split(" ")[1];

    try{
        const decodedToken = jwt.verify(token,JWT_SECRET.JWT_SECRET);
        console.log(decodedToken);
        res.authenticateduserId = decodedToken.userId;
        console.log("locals=",res.authenticateduserId)
        next();         
    }catch(error){
        return res.status(403).json({
            message:"Invalid or expired Token"
        });        
    }
}

module.exports = {authMiddleware}