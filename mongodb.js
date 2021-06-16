const mongodb=require("mongodb");
const MongoClient=mongodb.MongoClient;
const connectionURL="mongodb://127.0.0.1:27017";
const databaseName="task-manager";
const ObjectID=mongodb.ObjectID;

const id=new ObjectID();
MongoClient.connect(connectionURL,{ useUnifiedTopology: true },(error,client)=>{
   if(error)
      return console.log("Unable to connect to Database..!!");
   console.log("Connected Successfully");  

//   console.log(id.id);
   const db=client.db(databaseName);
//    db.collection("users").find({age:20}).toArray((error,result)=>{
//        if(error)
//         return console.log(error);  
//          console.log(result);
//    })
//  db.collection("users").update({
//      name:"Haman"
//  },
//  {
//      $set:{
//          age:201
//      }
//  }).then((res)=>{
//      console.log(res);
//  }).catch((error=>{
//      console.log(error)
//  }))
db.collection("users").deleteMany({
    age:20
},
{
    $set:{
        age:201
    }
}).then((res)=>{
    console.log(res);
}).catch((error=>{
    console.log(error)
}))
// db.collection("tasks").insertMany([{
//     description: "Web dev",
//     completed: true
// },
// {
//     description: "Software dev",
//     completed: false
// },
// {
//     description: "Android dev",
//     completed: false 
// }],(error,result)=>{
//  if(error)
//    return console.log(error);
//  return console.log(result.ops);  
// })
 
})