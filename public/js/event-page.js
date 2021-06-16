if(performance.navigation.type == 2){
    location.reload(true);
  }
  
var signin=document.querySelector(".sign-in")
var e=document.querySelector(".e")
var drop=document.querySelector(".dropdown")
var view=document.querySelector(".view")

if(!e.textContent){
  signin.style.display="none" 
  drop.style.display="block" 
  document.querySelector("#but1").dataset.target="#exampleModal3"
}
if(document.querySelector(".reg1").textContent){
  document.querySelector("#but1").disabled=true
  document.querySelector("#but1").textContent="Registered!"
  document.querySelector("#but1").classList.add("text-success")
}
  
if(document.querySelector(".delete").textContent){
  document.querySelector(".del").style.display="block"
  document.querySelector(".reg_users").style.display="block"

}
  if(document.querySelector(".edit-event3").textContent){
  document.querySelector(".edit-poster").style.display="flex"
    document.querySelector(".edit-event1").style.display="inline-block"
  }

  const link="/register/" + document.querySelector(".edit-event4").textContent

  $("#register").submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: link,
        type: "POST",
        data: {

        },
        success: function(data){
          document.querySelector(".edit-event4").textContent=" "
         $("#exampleModal4").modal("show")
         setTimeout(function(){
          window.location.reload();
        },1000)
           
        }
    });
});

function checkextension() {
  var file = document.querySelector("#exampleFormControlFile1");
  if ( /\.(jpe?g|png|gif|jpg)$/i.test(file.files[0].name) === false ) {
       file.setCustomValidity("Please select an image!!") 
      }
      else
        file.setCustomValidity("")
}

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