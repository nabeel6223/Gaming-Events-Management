const mongoose=require("mongoose");
const express=require("express");
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
// const x=require("./src/models/user.js");
const UserRouter=require("./src/routers/user.js")
// const User=x.User;
const EventRouter = require('./src/routers/event')
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app=express();
const port=process.env.PORT || 3000;

// app.use((req,res,next)=>{
//    res.status(503).send("Site currently down..Come Back soon!!") 
// })

app.use(express.json())
app.use(UserRouter);
app.use(EventRouter)
app.get("",(req,res)=>{
    res.send("YASSS");
})



app.listen(port,()=>{
    console.log("Starting the server on port " + port);
})

// const myfunc=async()=>{
//   const token=jwt.sign({_id: "abc123"},"nabeel99",{expiresIn:"10 seconds"})
//   console.log(token)
//   const data=jwt.verify(token,"nabeel99")  
//   console.log(data)
// }
// myfunc()