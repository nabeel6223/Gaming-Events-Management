
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
var userImage=document.querySelector(".user-profile")
var errorOld=document.querySelector(".errorOld")
var succ=document.querySelector(".succ")
var oldPass=document.querySelector("#exampleInputPassword1")
var pass=document.querySelector("#exampleInputPassword2")

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

$(".qw").submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: "/user/change-pass",
        type: "GET",
        data: {
            'oldPassword': oldPass.value,
            'password': pass.value
        },
        success: function(data){
            // console.log(data);
            if(data.error){
              errorOld.textContent=data.error
              succ.textContent=""
            }
            if(data.response){
                errorOld.textContent=""
                succ.textContent=data.response
            }  
        }
    });
});
function findeventsforweek(){
    var array=[]
     var today = new Date();
     for(i=0;i<7;i++)
     {
       var next = new Date(today)
       next.setDate(next.getDate() + i)
       var dd = next.getDate();
       var mm = next.getMonth()+1; 
       var yyyy = next.getFullYear();
       if(dd<10) 
        {
          dd='0'+dd;
        }
       if(mm<10) 
        {
          mm='0'+mm;
        } 
        next = yyyy+'-'+mm+'-'+dd;
        array.push(next)
      }
      return array
}

var nothing1=document.querySelector("#nothing1")
var nothing2=document.querySelector("#nothing2")
var th1=document.querySelector("#th1")
var th2=document.querySelector("#th2")
var totalLen=0; var totalLenWeek=0;
var reg1=document.querySelector("#reg")
var week=document.querySelector("#week")
var table1=document.querySelector(".table1")
var table2=document.querySelector(".table2")
var dp=document.querySelector("#dp")
table1.innerHTML="";
table2.innerHTML="";
var date,title
var reg=0, crt=0;
$.ajax({
    url: "/all-events-info",
    type: "POST",
    data: {
  
    },
    success: function(data){
  
        // console.log(data);
        var n= data.event.length
        const array=findeventsforweek()
        if(n){
        for(var i=0;i<n;i++)
        {  
            totalLen+=data.event[i].registered_users.length
            for(var j=0;j<array.length;j++){
              if(array[j]===data.event[i].Date){
                 totalLenWeek++;
                 title=data.event[i].EventName
                 date=data.event[i].Date 
                 crt=crt+1
                 table2.innerHTML+="<tr> <th scope=\"row\">"+ crt +"</th><td>"+ date  +"</td><td>" + title + "</td></tr>"
              }
            }
        }           
         reg1.textContent=totalLen;
         week.textContent=totalLenWeek;
      }
      if(!table2.innerHTML){
        th2.style.display="none"
        nothing2.style.display="block" }
      }
  });
var user,city
  $.ajax({
    url: "/users",
    type: "POST",
    data: {

    },
    success: function(data){
        // console.log(data);
        var n= data.user.length
   
        if(n){
        for(var i=0;i<n;i++)
        {  var x=i+1
           user=data.user[i].name
           city=data.user[i].City
           table1.innerHTML+="<tr><th scope=\"row\">"+ x+"</th><td>"+user+"</td><td>" + city + "</td></tr>"
        }
      }
      if(!table1.innerHTML){
        th1.style.display="none"
        nothing1.style.display="block" }

    }
});
