const mongoose=require("mongoose");
const fetch=require("node-fetch")
const express=require("express");
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
// const x=require("./src/models/user.js");
const UserRout=require("./routers/user.js")
const UserRouter=UserRout.router
// const User=x.User;
const TaskRouter = require('./routers/event')
const path = require("path");
const app = express();
const bodyParser=require("body-parser")
const logger=require("morgan")
app.use(express.urlencoded({ extended: false }));   //parsing from form 
// app.use(bodyParser());              //
// app.use(logger('dev'));
app.use(express.json())             //
app.use(UserRouter);
app.use(TaskRouter)
// app.use(logger('dev'));  // Creating a logger (using morgan)
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json())
const auth=require("./middleware/auth")

const port= process.env.PORT || 3000 ;
// var urlencodedParser = bodyParser.urlencoded({extended: false});
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const publicDirPath= path.join(__dirname, "../public");
app.use(express.static(publicDirPath));
 app.set("view engine","hbs");



 app.get("",auth,(req,res)=>{
     if(req.error)
       res.render("index",{error:req.error});
     if(!req.error)
       res.render("index",req.user)  
 })

 app.get("/create-event",auth,(req,res)=>{
     if(!req.error)
        res.render("create-event",{
            email:req.user.email,
            mobile:req.user.Mobile}
            )
     if(req.error)
        res.render("create-event",{error:req.error})   
 })
 app.get("/all-events",auth,(req,res)=>{
    if(req.error)
    res.render("all-events",{error:req.error});
  if(!req.error)
    res.render("all-events",req.user)  
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render("sign-up")
})
app.get("/profile/:id/edit-profile",auth,(req,res)=>{
    if(req.error)
       res.redirect("/login")
   if(!req.error && req.user.id==req.params.id){ 
        if(req.user.role=="admin")
            res.redirect("/dashboard/admin")
        else    
            res.render("edit-profile",req.user)
   }
    else
      res.render("/error")    
})
app.get("/profile/:id/change-email",auth,(req,res)=>{
    if(req.error)
       res.redirect("/login")
   if(!req.error && req.user.id==req.params.id){  
    if(req.user.role=="admin")
    res.redirect("/admin/dashboard/change-email") 
     else 
        res.render("email-change",req.user)
   }
    else
        res.redirect("/error")    
})
app.get("/profile/:id/change-password",auth,(req,res)=>{
    if(req.error)
       res.redirect("/login")
   if(!req.error && req.user.id==req.params.id){  
    if(req.user.role=="admin")
    res.redirect("/admin/dashboard/change-password") 
     else 
        res.render("pass-change",req.user)
   }
     else
        res.redirect("/error")    
})
app.get("/profile/:id",auth,(req,res)=>{   
     if(req.error)
        res.redirect("/login")
     else if(!req.error && req.user.id==req.params.id){   
           if(req.user.role=="admin")
           res.redirect("/admin/dashboard")
      else
           res.render("user-profile",req.user)    
     }
     else
     res.redirect("/error")    
})
app.get("*",(req,res)=>{
    res.render("error");
})

 app.listen(port,()=>{
    console.log("Starting the server on port " + port);
})

// module.exports=urlencodedParser
// const YOUR_API_KEY="live_5c1dab8fcdd9d0735c454bd55269f99289fee91181ac3c828be79a624b34b6dd"

// fetch("https://api.kickbox.com/v2/verify?email=nabeelmd99@gmail.com&apikey=" + YOUR_API_KEY)
//   .then(res => res.text())
//   .then((body)=> {
//       const response=JSON.parse(body)
//     console.log(response.result)

//     });