
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



  $.ajax({
    url: "/user/dp",
    type: "POST",
    data: {

    },
    success: function(data){
        if(data.user.avatar)
          dp.src="/users/avatar/" + data.user._id
          document.querySelector("#dp1").src="/users/avatar/" + data.user._id
       

    }
});

function checkextension() {
  var file = document.querySelector("#exampleFormControlFile1");
  if ( /\.(jpe?g|png|gif|jpg)$/i.test(file.files[0].name) === false ) {
       file.setCustomValidity("Please select an image!!") 
      }
      else
        file.setCustomValidity("")
}