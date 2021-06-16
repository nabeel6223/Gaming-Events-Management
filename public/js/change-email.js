
$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload(true/false); 
    }
});

var signin=document.querySelector(".sign-in")
var e=document.querySelector(".e")
var drop=document.querySelector(".dropdown")
var view=document.querySelector(".view")

if(!e.textContent){
  signin.style.display="none" 
  drop.style.display="block" }

var error1=document.querySelector(".error1")
var error2=document.querySelector(".error2")
var succ=document.querySelector(".succ")
var pass=document.querySelector("#exampleInputPassword1")
var email=document.querySelector("#exampleInputEmail1")

  $.ajax({
    url: "/user/dp",
    type: "POST",
    data: {

    },
    success: function(data){
        if(data.user.avatar)
          dp.src="/users/avatar/" + data.user._id
       

    }
});

$(".qw").submit(function(e) {
    e.preventDefault();
    succ.textContent="Processing...";
    $.ajax({
        url: "/user/change-email",
        type: "POST",
        data: {
            'Password': pass.value,
            'Email': email.value
        },
        success: function(data){
            // console.log(data);
            if(data.error1){
              error1.textContent=data.error1
              error2.textContent=""
              succ.textContent=""
            }
            if(data.error2){
                error2.textContent=data.error2
                error1.textContent=""
                succ.textContent=""
              }
            if(data.response){
                error1.textContent=""
                error2.textContent=""
                succ.textContent=data.response
                setTimeout(function(){
                  window.location.replace(data.url);
              },2000)
            }  
        }
    });
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