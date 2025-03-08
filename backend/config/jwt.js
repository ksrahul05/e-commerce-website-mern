const jwt=require('jsonwebtoken')
require("dotenv").config()
const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"1h"})
}
const validateToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET)
}
module.exports={generateToken,validateToken}


/*
        In the generate valid token function we are doing the password encryption and storing in the database
        In the validatetoken we are verifying the user is a valid user or not
        finally we are importing into the another module

*/
