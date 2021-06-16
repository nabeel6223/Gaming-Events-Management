const express = require('express')
const Event = require('../models/event')
const auth = require('../middleware/auth')
const multer= require("multer")
const sharp = require('sharp')
const fs=require("fs")
const x=require("../models/user.js");
const User=x.User;
// const urlencodedParser=require("../app")
const router = new express.Router()


// const upload = multer({
//     dest: "./uploads/",
//     // limits: {
//     //     fileSize: 1000000
//     // },
//     // fileFilter(req, file, cb) {
//     //     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//     //         return cb(new Error('Please upload an image'))
//     //     }
//     //     console.log(req)

//     //     cb(undefined, true)
//     // }
// })
// var upload = multer({ dest: './public/data/uploads/' })
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() )
//     }
//   })
  const storage = multer.memoryStorage() 
//   var upload = multer({ storage: storage })
const upload = multer({ storage })

router.post('/events',auth,upload.single('myFile'), async (req, res) => {  //auth
    // const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
  const buffer= Buffer.from(req.file.buffer).toString('base64')
    // console.log(req.file.path)
    const event = new Event({
        ...req.body,
        File: Buffer.from(buffer, 'base64'),
        owner: req.user._id
    })
    // console.log(event)

    try {
        // const file= "myFile" + fname
        // const buffer = await sharp(file).toBuffer()
        // console.log(buffer)
        // event.file = buffer 
        await event.save()
        // console.log(event)
        res.redirect("/event-page/" + event._id)   
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})
router.post('/event-info/edit/:id', async (req, res) => {
    const event=await Event.findById(req.params.id)
    // const updates = Object.keys(req.body)
    // console.log(req.body)
    // console.log(req.user)
    // console.log(req.body)

    try {
        if(req.body.EventName)
           event.EventName=req.body.EventName 
        if(req.body.Game)
           event.Game=req.body.Game
        if(req.body.Date)
           event.Date=req.body.Date
        if(req.body.Description)
           event.Description=req.body.Description   
        await event.save()
        // res.send(req.user)
        // console.log(updates)
        // console.log(req.user)
        res.redirect("/event-page/" + req.params.id)

    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})
router.post('/event-poster/:id',upload.single('updatefile'), async (req, res) => {  //auth
    // const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
  const buffer= Buffer.from(req.file.buffer).toString('base64')
    // console.log(req.file.path)
    const event= await Event.findById(req.params.id)
    event.File= Buffer.from(buffer, 'base64')
    // console.log(event)

    try {
        // const file= "myFile" + fname
        // const buffer = await sharp(file).toBuffer()
        // console.log(buffer)
        // event.file = buffer 
        await event.save()
        // console.log(event)
        res.redirect("/event-page/" + req.params.id) 
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})
router.post("/all-events-info",async(req,res)=>{
    const event= await Event.find({},"_id EventName Game Date Description Email Mobile registered_users").sort({Date: 1})
    // event.select("-File")
    res.send({
          event
    })
})
router.post("/all-events-info1",auth,async(req,res)=>{
    const event= await Event.find({},"_id EventName Game Date Description Email Mobile owner registered_users").sort({Date: 1})
    // event.select("-File")
    res.send({
          event,
          owner:req.user.id
    })
})

router.get('/event-page/:id', auth,async (req, res)=>{
    try{
        const event = await Event.findById(req.params.id)
        const user= await User.findById(event.owner)
        const poster= "/event-poster/" + req.params.id
        const reg_len=event.registered_users.length
        if(event){
            if(!req.user)
              res.render("event-page",{
                event,
                user,
                poster,
                error:"1",
                id:req.user.id
            })
            else if(user.id == req.user.id ){
             if(event.registered_users.includes(req.user.email))
              res.render("event-page",{
                event,
                user,
                poster,
                edit:"/event-page/" + event.id + "/edit",
                edit1:1,
                del:"/event-page/"+ event.id  + "/delete",
                del1:1,
                reg:"1",
                reg_len,
                id:req.user.id
               })
               else
               res.render("event-page",{
                 event,
                 user,
                 poster,
                 edit:"/event-page/" + event.id + "/edit",
                 edit1:1,
                 del:"/event-page/"+ event.id  + "/delete",
                 del1:1,
                 reg_len,
                 id:req.user.id
                })
            }
            else{
                if(event.registered_users.includes(req.user.email))
                res.render("event-page",{
                  event,
                  user,
                  poster,
                  reg:"1",
                  id:req.user.id
                 })
                 else
                 res.render("event-page",{
                   event,
                   user,
                   poster,
                   id:req.user.id
                  })
                }
            }
         else
              res.render("error")
        }
     catch(e){
         console.log(e)
         res.render("error")
     }
     
})
router.get('/event-page/:id/edit',auth,async (req, res)=>{
        try{
            const event = await Event.findById(req.params.id)
            const user= await User.findById(event.owner)
            const poster= "/event-poster/" + req.params.id
            if(event && user.id == req.user.id ){
                  res.render("event-page-edit",{
                    event,
                    user,
                    poster,
                    edit1: "/event-info/edit/" + event.id ,
                    back:"/event-page/" + event.id,
                    id:req.user.id
                   })
                }  
             else
                  res.render("error")
            
            }
         catch(e){
             res.render("error")
         }
})
router.post("/register/:id",auth, async(req,res)=>{
    // console.log(event)
    const event = await Event.findById(req.params.id)
    event.registered_users.push(req.user.email)
    await event.save()
    res.send()

})
router.get('/event-poster/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)

        if (!event || !event.File) {
            throw new Error()
        }

        res.setHeader('Content-Type', 'image/jpeg')
        res.send(event.File)
    } catch (e) {
        res.status(404).send()
    }
})
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/profile/events', auth, async (req, res) => {
    // const match = {}
    // const sort = {}

    // if (req.query.completed) {
    //     match.completed = req.query.completed === 'true'
    // }

    // if (req.query.sortBy) {
    //     const parts = req.query.sortBy.split(':')
    //     sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    // }

    try {
        await req.user.populate({
            path: 'events',
            // match,
            // options: {
            //     limit: parseInt(req.query.limit),
            //     skip: parseInt(req.query.skip),
            //     sort
            // }
        }).execPopulate()
        // res.send(req.user.tasks)
        console.log(req.user.events)
    } catch (e) {
        res.status(500).send()
        console.log(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/event-page/:id/delete', async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({ _id: req.params.id })

        if (!event) {
            res.status(404).send()
        }

        res.redirect("/")
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router