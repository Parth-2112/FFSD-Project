// document.addEventListener("keypress", function(e) {
//     let key=e.key
//     if (key == "Enter") {
//         document.getElementById("input-btn").click();
//     }
//     // console.log(e.key)
// })

// const { isWindows } = require("nodemon/lib/utils");
var btn_submit = document.getElementById("onclickbutton");
// alert("Enter the year before 2011");
function validation() 
{
  if (document.getElementById("dob").value === "") 
  {
    alert("Please enter a year");
    // event.preventDefault();
  } 
  else if (document.getElementById("dob").value > 2010) 
  {
      // document.getElementById("year").setAttribute("href", "../interestpage.ejs");
       window.location.reload(true);
      // btn_submit.disabled = true;
      alert("Please select a year before 2010");
      // event.preventDefault();

  } else{
    // btn_submit.disabled = false;
  }
}
