
$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload(true/false); 
    }
});
// function loadDoc() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//        document.getElementById("exampleInputPassword1").innerHTML = this.responseText;
//       }
//     };
//     xhttp.open("GET", "/user/change-pass", true);
//     xhttp.send();
// }



var pass2=document.querySelector("#exampleInputPassword2")
var pass3=document.querySelector("#exampleInputPassword3")

function check(x) {
    if (pass2.value != x.value) {
        pass2.setCustomValidity('Password Must be Matching.');
    } else {
        // input is valid -- reset the error message
        pass2.setCustomValidity('');
    }
}

var signin=document.querySelector(".sign-in")
var e=document.querySelector(".e")
var drop=document.querySelector(".dropdown")
var view=document.querySelector(".view")

if(!e.textContent){
  signin.style.display="none" 
  drop.style.display="block" }


  
var userImage=document.querySelector(".user-profile")


// $.ajax({
//      url: "/user/dp",
//      type:"GET",
//      data:{
         
//      },
//      success: function(data){
//          if(data.user.avatar)
//              userImage.src="/users/avatar/" + data.user._id
//      }
// })


var nothing1=document.querySelector("#nothing1")
var nothing2=document.querySelector("#nothing2")
var th1=document.querySelector("#th1")
var th2=document.querySelector("#th2")
var table1=document.querySelector(".table1")
var table2=document.querySelector(".table2")
var dp=document.querySelector("#dp")
table1.innerHTML="";
table2.innerHTML="";
var date,title
var reg=0, crt=0;

$.ajax({
    url: "/all-events-info1",
    type: "POST",
    data: {

    },
    success: function(data){

        // console.log(data);
        var n= data.event.length
        if(n){
        for(var i=0;i<n;i++)
        { 
          for(var k=0;k<data.event[i].registered_users.length;k++)
          {
             if(data.event[i].registered_users[k] === document.querySelector(".email-info").textContent){
                title=data.event[i].EventName
                date=data.event[i].Date 
                reg=reg+1
                table1.innerHTML+="<tr> <th scope=\"row\">"+ reg +"</th><td>"+ date  +"</td><td>" + title + "</td></tr>"
            }  
          }
          if(data.event[i].owner === data.owner){
            title=data.event[i].EventName
            date=data.event[i].Date 
            crt=crt+1
            table2.innerHTML+="<tr> <th scope=\"row\">"+ crt +"</th><td>"+ date  +"</td><td>" + title + "</td></tr>"
        }
        }
      }
       if(!table1.innerHTML){
          th1.style.display="none"
          nothing1.style.display="block" }
       if(!table1.innerHTML){
          th2.style.display="none"
          nothing2.style.display="block" }
    }
});
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