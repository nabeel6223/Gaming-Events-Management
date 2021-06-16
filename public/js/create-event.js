var mod=document.querySelector("#exampleModal1")
var e=document.querySelector(".e")
var e1=document.querySelector(".e1")

// modal.modal="show"

// document.addEventListener('DOMContentLoaded', function(){ 
//    mod.modal()

// }, false);
if(performance.navigation.type == 2){
    location.reload(true);
 }
// $(window).bind("pageshow", function(event) {
//     if (event.originalEvent.persisted) {
//         window.location.reload(true); 
//     }
// });
window.onpageshow = function(event) {
    if(e1.textContent)
       $("#exampleModal1").modal(); 
       
};
      

  

//   $(window).on('pageshow', function(){
//     $("#exampleModal1").modal();
// });
function checkextension() {
    var file = document.querySelector("#exampleFormControlFile1");
    if ( /\.(jpe?g|png|gif|jpg)$/i.test(file.files[0].name) === false ) {
         file.setCustomValidity("Please select an image!!") 
        }
        else
          file.setCustomValidity("")
  }