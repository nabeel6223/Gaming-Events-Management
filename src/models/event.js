const mongoose = require('mongoose')
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")

const Eventschema = new mongoose.Schema({
    Description: {
        type: String,
        // required: true,
        trim: true,
    },
    EventName:{
        type: String,
        required: true,
        trim: true,
        maxlength:30
    },
    Game:{
        type: String,
        required: true,
        trim: true,
        maxlength:20
    },
    Date:{
        type: String,
        // required: true,
        trim: true,
    },
    Email:{
        type:String,
        // required:true,
        validate(value){
            if(!validator.isEmail(value))
               throw new Error("Check email!!");
        }
    },
    Mobile:{
         type:String,
        //  required:true,
         maxlength:10
    },
    File:{
        type:Buffer,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    },
    registered_users:[{
        type:String,
        // required:true,
        validate(value){
            if(!validator.isEmail(value))
               throw new Error("Check email!!");
        }
    }]
}, {
    timestamps: true
})

const Event = mongoose.model('Event', Eventschema)

module.exports = Event