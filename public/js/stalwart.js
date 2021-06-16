// const exp=require("express")
// var fetch = require("node-fetch");


if(performance.navigation.type == 2){
  location.reload(true);
}

// module.exports={
//     mail,pass
// }
function findMonth(x){
var Month=["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
return Month[x-1]

}
var signin=document.querySelector(".sign-in")
var e=document.querySelector(".e")
var drop=document.querySelector(".dropdown")
var view=document.querySelector(".view")

if(!e.textContent){
  signin.style.display="none" 
  drop.style.display="block" }

var row=document.querySelector(".row")
var nothing=document.querySelector(".nothing")

var image,title,date,text,date1,date2,date3;

row.innerHTML=""
$.ajax({
  url: "/all-events-info",
  type: "POST",
  data: {

  },
  success: function(data){

      // console.log(data);
      var n= data.event.length

      if(n){
      for(var i=0;i<n;i++)
      {  text=""  
        if(i<=3){
          image="/event-poster/" + data.event[i]._id
          title=data.event[i].EventName
          date=data.event[i].Date
          date1=date.substring(8,10);  date2=date.substring(5,7); date3 = date.substring(0,4);
          date2=findMonth(date2);
          date=date1 + " " + date2 + " " + date3
          href="/event-page/" + data.event[i]._id
          for(var j=0;j<data.event[i].Description.length;j++)
            if(j<=100)
                text+=data.event[i].Description[j]
          text+="...."
          row.innerHTML+= "<div class=\"col-12 mt-3 \"> <div class=\"card\"> <div class=\"card-horizontal\"> <div class=\" card1\">"+ date +"</div><div class=\"img-square-wrapper\"> <a href=\"" +  href + "\"  ><img  src=\""+ image + " \" alt=\"Card image cap\"> </a></div> <div class=\"card-body\"> <h4 class=\"card-title\">" + title + "</h4>  <p class=\"card-text\">" + text  + "</p></div></div> </div></div>"
        }
      }
    }
    if(!n){
      nothing.style.display="block"
      view.style.display="none" }
    }
});

$.ajax({
  url: "/user/dp",
  type: "POST",
  data: {

  },
  success: function(data){
      if(data.user.avatar)
        document.querySelector("#dp1").src="/users/avatar/" + data.user._id
     

  }
});