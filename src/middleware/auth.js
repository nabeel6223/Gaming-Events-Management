const jwt=require("jsonwebtoken")
const x=require("../models/user.js");
const User=x.User;

const auth= async(req,res,next)=>{
    
    try{
        const UserRout=require("../routers/user")
        const tok=UserRout.tok
        // console.log("sadsa")
        const token=tok
        // console.log(token)
        const decoded=jwt.verify(token,"nabeel99")
        const user= await User.findOne({ _id:decoded._id , "tokens.token":token})
        if(!user)
          throw new Error()

        req.user=user
        req.token=token
        next()
    }
    catch(e){
        req.error="Please Authenticate"
        // res.status(401)
        next()
    }
}
module.exports=auth