const mongoose=require("mongoose");
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const Task = require('./event')
const fetch=require("node-fetch")




const Userschema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
        // required:true
    },
    role:{
        type:String,
        default:"user"
    },
    Bio:{
        type:String,
        trim:true
    },
    City:{
        type:String,
        trim:true,
        default:"City"
    },
    BirthDate:{
        type:String,
        trim:true
    },
    Mobile:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
               throw new Error("Check email!!");
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
        validate(value){
            var c=0;
            // for(var i=0;i<value.length;i++)
            //   if(value.charCodeAt(i)>=33 && value.charCodeAt(i)<=47)
            //     c++;
            // if(c==0)
            //   throw new Error("Password must contain a special character!!");     
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type: Buffer
    }
},
{
    timestamps:true
})

Userschema.virtual('events', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'owner'
})

Userschema.methods.toJSON=function(){
    const user=this
    const userObject=  user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}
Userschema.methods.generateAuthToken= async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},"nabeel99",)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token;

}
Userschema.statics.findByCredentials=async(email,password)=>{
    const user= await User.findOne({ email})
    // console.log(user)
    if(!user)
      throw new Error("Unable to Login!")
    const isOK=await bcrypt.compare(password,user.password)
     if(!isOK){
       throw new Error("Unable to Login!")
     }
    return user   
}
Userschema.pre("save", async function (next){
    const user=this;
   if(user.isModified("password")){
         user.password= await bcrypt.hash(user.password,8);
   }
    next();
})

// Delete user tasks when user is removed
Userschema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})
const User=mongoose.model("User",Userschema)
module.exports={
    User:User
}