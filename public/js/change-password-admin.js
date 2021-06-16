
$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload(true/false); 
    }
});

var errorOld=document.querySelector(".errorOld")
var error2=document.querySelector(".error2")
var succ=document.querySelector(".succ")
var oldPass=document.querySelector("#exampleInputPassword1")
var pass2=document.querySelector("#exampleInputPassword2")
var pass3=document.querySelector("#exampleInputPassword3")

function check(x) {
    if (pass2.value != x.value) {
        pass3.setCustomValidity('Password Must be Matching.');
    } else {
        // input is valid -- reset the error message
        pass3.setCustomValidity('');
    }
}


var signin=document.querySelector(".sign-in")
var e=document.querySelector(".e")
var drop=document.querySelector(".dropdown")
var view=document.querySelector(".view")

if(!e.textContent){
  signin.style.display="none" 
  drop.style.display="block" }



 

$(".qw").submit(function(e) {
    e.preventDefault();
    succ.textContent="Processing...";
    $.ajax({
        url: "/user/change-pass",
        type: "POST",
        data: {
            'oldPassword': oldPass.value,
            'password': pass2.value
        },
        success: function(data){
            // console.log(data);
            if(data.error){
              errorOld.textContent=data.error
              succ.textContent=""
              error2.textContent=""
            }
            if(data.error2){
                error2.textContent=data.error2
                errorOld.textContent=""
                succ.textContent=""   
            }
            if(data.response){
                error2.textContent=""
                errorOld.textContent=""
                succ.textContent=data.response
                setTimeout(function(){
                    window.location.replace(data.url);
                },2000)

            }  
        }
    });
});