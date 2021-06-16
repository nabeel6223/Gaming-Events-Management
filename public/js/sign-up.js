
// $(window).bind("pageshow", function(event) {
//     if (event.originalEvent.persisted) {
//         window.location.reload(true/false); 
//     }
// });
var pass1=document.querySelector("#exampleInputPassword1")
var pass2=document.querySelector("#exampleInputPassword2")

function check(x) {
    if (pass1.value != x.value) {
        pass2.setCustomValidity('Password Must be Matching.');
    } else {
        // input is valid -- reset the error message
        pass2.setCustomValidity('');
    }
}

var e1=document.querySelector(".error1")
var e=document.querySelector(".error")
var e2=document.querySelector(".error2")


if(!e1.textContent && !e2.textContent)
   e.style.display="none"

else if(!e1.textContent){
    e.style.display="block"
    e1.style.display="none"  }
   
else if(!e2.textContent){
    e.style.display="block"
    e2.style.display="none"   }   
  
