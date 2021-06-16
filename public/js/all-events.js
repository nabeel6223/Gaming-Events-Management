$(window).bind("pageshow", function(event) {
  if (event.originalEvent.persisted) {
      window.location.reload(true/false); 
  }
});

var signin=document.querySelector(".sign-in")
var e=document.querySelector(".e")
var drop=document.querySelector(".dropdown")

if(!e.textContent){
  signin.style.display="none" 
  drop.style.display="block" }


var pages=document.querySelector(".pages")
const prev=document.querySelector(".pr")
const first=document.querySelector(".fr")
const sec=document.querySelector(".se")
const third=document.querySelector(".th")
const fourth=document.querySelector(".fo")
const fifth=document.querySelector(".fi")
const next=document.querySelector(".nxt")

var signin=document.querySelector(".sign-in")
var e=document.querySelector(".e")
var drop=document.querySelector(".dropdown")
var x;

if(!e.textContent)
  signin.style.display="none" 
else{
  e.style.display="none" 
  drop.style.display="none"
}
pageChange=function (s,n) { 
  prev.textContent=""
  first.textContent=""
  sec.textContent=""
  third.textContent=""
  fourth.textContent=""
  fifth.textContent=""
  next.textContent=""

  first.textContent=s

if(s+1<=n)
  sec.textContent=s+1
if(s+2<=n)
  third.textContent=s+2
if(s+3<=n)
  fourth.textContent=s+3
if(s+4<=n)
  fifth.textContent=s+4
if(s+5<=n)
  next.textContent="Next"
if(s-1>0)
  prev.textContent="Prev"  
 }
// pageChange(7,10)
// run(1)
window.onpageshow = function(event) {
  run(parseInt(first.textContent))
     
};

prev.textContent=""
prev.addEventListener("click",(e)=>{
  e.preventDefault()
  run(parseInt(first.textContent)-1)
  // pageChange(parseInt(first.textContent)-1,4)
})
next.addEventListener("click",(e)=>{
  e.preventDefault()
  run(parseInt(first.textContent)+1)
  // pageChange(parseInt(first.textContent) +1,4)
})
first.addEventListener("click",(e)=>{
  e.preventDefault()
  run(parseInt(first.textContent))
  // pageChange(parseInt(first.textContent),4)
})
sec.addEventListener("click",(e)=>{
  e.preventDefault()
  run(parseInt(sec.textContent))
  // pageChange(parseInt(sec.textContent),4)
})
third.addEventListener("click",(e)=>{
  e.preventDefault()
  run(parseInt(third.textContent))
  // pageChange(parseInt(third.textContent),4)
})
fourth.addEventListener("click",(e)=>{
  e.preventDefault()
  run(parseInt(fourth.textContent))
  // pageChange(parseInt(fourth.textContent),4)
})
fifth.addEventListener("click",(e)=>{
  e.preventDefault()
  run(parseInt(fifth.textContent))
  // pageChange(parseInt(fifth.textContent),4)
})

var container1=document.querySelector("#container1")
var nothing=document.querySelector(".nothing")

var image,title,date,text;
run=function(x)   {  
  container1.innerHTML=""
      $.ajax({
      url: "/all-events-info",
      type: "POST",
      data: {

      },
      success: function(data){

          // console.log(data);
          var n= data.event.length
          if(n){
          var pg1=4
          const pg=n/pg1
          pageChange(x,pg)

          // x=(2*(x-1))+1
          for(var i=pg1*(x-1);i<=(pg1*x)-1;i++)
          {   text="" 
             if(i<=n-1){
            image="/event-poster/" + data.event[i]._id
            title=data.event[i].EventName
            date=data.event[i].Date
            href="/event-page/" + data.event[i]._id
            for(var j=0;j<data.event[i].Description.length;j++)
              if(j<=35)
                  text+=data.event[i].Description[j]
            text+="...."
            container1.innerHTML+= "<div class=\"card\"><a href=\"" + href +"\"><img src=\""+ image  +"\" /></a> <div class=\"product\"><h1>"+ title + "</h1> <h2>"+ date + "</h2> <p class=\"desc\">"+ text +"...." +"</p> <div class=\"buttons\"><button class=\"add\"><a href=\""+ href +"\">Register</a></button></div> </div> </div>"
          }
          }
        }
        if(!n){
          nothing.style.display="block"
          pages.style.display="none" }
         

      }
  });
}


//   var events=document.querySelector(".card")
// events.addEventListener("click",()=>{
//   document.location.href = '/event-page';
// })

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