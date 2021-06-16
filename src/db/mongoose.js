const mongoose=require("mongoose");
const validator=require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const User=mongoose.model("User",{
    name:{
        type:String,
        trim:true,
        required:true
    },
    age:{
        type:Number,
        default:2000,
        validate(value){
            if(value<18)
              throw new Error("AGE RESTRICTION!! BE 18");
        }
    },
    email:{
        type:String,
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
        validate(value){
            for(var i=0;i<value.length;i++)
              if(value[i]>=33 && value[i]<=47)
                continue;
              else
               break;
            if(i!=value.length)
              throw new Error("Password must contain a special character!!");     
        }
    }

})
// const me=new User({
//     name:"           Nanga lsdssd                     ",
//     // age:"12",
//     email:"aa@212.com"
// })
// me.save().then(()=>{
//   console.log(me);
// }).catch((error)=>{
//   console.log(error);
// })

// 5eb8713fc4534b2a34ec5406

// const UpdateAgeandCount=async (id,age)=>{
//     const user= await User.findByIdAndUpdate(id,{ age })
//     const count= await User.countDocuments({age})
//     return count;
// }

// UpdateAgeandCount("5eb8713fc4534b2a34ec5406",2000).then((count)=>{
//    console.log(count);
// }).catch((e)=>{
//     console.log(e)
// })
module.exports={
    User:User
}