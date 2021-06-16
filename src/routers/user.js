const mongoose=require("mongoose");
const express=require("express");
var router = express.Router();
const bcrypt=require("bcrypt")
const multer = require('multer')
const Event = require('../models/event')
const sharp = require('sharp')
const x=require("../models/user.js");
const auth=require("../middleware/auth")
const User=x.User;
const fetch=require("node-fetch")
const YOUR_API_KEY="live_5c1dab8fcdd9d0735c454bd55269f99289fee91181ac3c828be79a624b34b6dd"
var kickbox = require('kickbox').client('live_5c1dab8fcdd9d0735c454bd55269f99289fee91181ac3c828be79a624b34b6dd').kickbox();
var url=require("url")
// const login=require("../../public/js/stalwart")
// const mail=login.mail
// const pass=login.pass
var response;
var response1=0;

router.get("/admin/dashboard",auth,async(req,res)=>{
    try{
    if(req.user){    
    if(req.user.role=="admin"){
    const user= await User.find({},"name")
    const event=await Event.find({})
    const len=user.length; const len1=event.length;
    res.render("admin",{
            len,
            len1
    })
    }
    else
      res.redirect("/error")
    }
    else 
       res.redirect("/login")
}
catch(e){
    res.redirect("/error")
    
}
})
router.get("/admin/dashboard/change-password",auth,async(req,res)=>{
    try{
      if(req.user){  
    if(req.user.role=="admin")
    res.render("pass-change-admin")
    else  
      res.redirect("/error")
    }
    else 
      res.redirect("/login")
}
    catch(e){
    res.redirect("/error")

    }

})
router.get("/admin/dashboard/change-email",auth,async(req,res)=>{
    try{
     if(req.user) {  
    if(req.user.role=="admin")
    res.render("email-change-admin")
    else  
      res.redirect("/error")
    }
    else
      res.redirect("/login")
}
    catch(e)
    {
        res.redirect("/error")   
    }

})
router.post('/signup',auth, async (req, res) => {

// console.log(req.body)
    try {
        if(req.user)
            res.redirect("/profile/" + req.user.id)
        
        else{
            const user = new User(req.body)
        // var url1="https://api.kickbox.com/v2/verify?email=" + req.body.email + "&apikey=" + YOUR_API_KEY
        // fetch(url1)
        // .then(resp => resp.text())
        // .then((body)=> {
        //    response=JSON.parse(body)
        kickbox.verify(req.body.email, function (err, response) {    
            // console.log(response.body);
            if(response.body.result=="deliverable")
              response1=1;
            else
              res.send({
              error2:"Email doesn't exists!" })
          });
         if(response1==1){
            user.email=req.body.email
            await user.save()
            const token = await user.generateAuthToken()
            const tok=token
            module.exports.tok=tok
            // res.status(201).send({ user, token })
            // console.log(user)
            res.redirect("/profile/" +  user.id  + "/edit-profile")
         }
        }
    } catch (e) {
        // res.status(400).send(e)
        res.render("sign-up",{
            error:"Email already exists!"
        })
        console.log(e)
    }
})

router.post('/login',auth, async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        const tok=token
        module.exports.tok=tok
        if(user.role=="admin")
           res.redirect("/admin/dashboard")
        else   
           res.redirect("/profile/" + user.id) 
    } catch (e) {
        res.render("login",{
            error:" We didn't recognize that email or password. Please Try Again!"
        })
        // console.log(e)
    }
    // console.log(req.body)
    // res.send("dsdsd")
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.redirect("/")
        // res.send()
    } catch (e) {
        res.render("login")
    }
})
router.post("/users",async(req,res)=>{
    const user= await User.find({},"name City")
    res.send({
            user
    })

})
// router.post('/users/logoutAll', auth, async (req, res) => {
//     try {
//         req.user.tokens = []
//         await req.user.save()
//         res.send()
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.post("/user/change-email",auth,async(req,res)=>{
    try{
        // var q= url.parse(req.url,true).query
        var q=req.body
        const isOK=await bcrypt.compare(q.Password,req.user.password)
        if(!isOK)
           res.send({
               error1:"Please enter Correct Password!"  })
        if(isOK)
        {
            if(req.user.email === q.Email)
            res.send({
            error2:"Must be a different Email!" })
            else{
                console.log(q.Email)
                kickbox.verify(q.Email, function (err, response) {    
                    if(response.body.result=="deliverable")
                      response1=1;
                    else
                      res.send({
                      error2:"Email doesn't exists!" })
                  });
                if(response1==1){
                   req.user.email=q.Email
                   await req.user.save()
                   res.send({
                    response:"Email Changed Successfully!",
                    url:"/profile/" + req.user.id
                  })
                }
            }
         }
     }
    catch(e){
      console.log(e)
      res.send({
        error2:"Email already exists!" })
    }
})
router.post("/user/change-pass",auth,async(req,res)=>{
    try{
    // var q= url.parse(req.url,true).query
    var q=req.body
    // console.log(q.oldPassword)
    if(q.oldPassword==q.password)
      res.send({
          error2:"New Password can't be same as old!!"
      })
    const isOK=await bcrypt.compare(q.oldPassword,req.user.password)
    if(!isOK)
      res.send({
          error:"Please enter Correct Password!"
      })
    if(isOK){
        // console.log(user)
        req.user.password= q.password
        await req.user.save()
        // console.log(req.user.password)
        res.send({
          response:"Password Changed Successfully!",
          url:"/profile/" + req.user.id
        })
    }
    }
    catch(e){
      console.log(e)
    }
})
router.post('/user/dp', auth, async (req, res) => {
    res.send({
        user:req.user
    })
})

router.post('/users/edit', auth, async (req, res) => {
    // const updates = Object.keys(req.body)
    // console.log(req.body)
    // console.log(req.user)
    // console.log(req.body)

    try {
        if(req.body.name)
           req.user.name=req.body.name
        if(req.body.Bio)
          req.user.Bio=req.body.Bio
        if(req.body.City)
          req.user.City=req.body.City
        if(req.body.BirthDate)
          req.user.BirthDate=req.body.BirthDate 
        if(req.body.Mobile)
          req.user.Mobile=req.body.Mobile     
        await req.user.save()
        // res.send(req.user)
        // console.log(updates)
        // console.log(req.user)
        res.redirect("/profile/" + req.user.id)

    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})

// router.delete('/users/me', auth, async (req, res) => {
//     try {
//         await req.user.remove()
//         res.send(req.user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

const storage = multer.memoryStorage() 
//   var upload = multer({ storage: storage })
const upload = multer({ storage })

router.post('/users/avatar', auth, upload.single('avatar'), async (req, res) => {
    // const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    const buffer= Buffer.from(req.file.buffer).toString('base64')
    // console.log(buffer)
    // console.log(req.file.path)
   req.user.avatar=Buffer.from(buffer, 'base64')
    await req.user.save()
    res.redirect("/profile")
}, (error, req, res, next) => {
   res.redirect("/profile")
})
router.get('/users/avatar/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.setHeader('Content-Type', 'image/jpeg')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports ={
    router
} 