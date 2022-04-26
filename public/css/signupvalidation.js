document.getElementById("submit").addEventListener("click", registration);


function registration()
{

   // var name= document.signup.name.value;
    var email= document.signup.eid.value;
    var uname= document.signup.uid.value;
    var pwd= document.signup.pwd.value;           
    
    
    var pwd_expression = /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-])/;
    var letters = /^[A-Za-z]+$/;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    // if(name=='')
    // {
    //     alert('Please enter your name');
    // }
    // else if(!letters.test(name))
    // {
    //     alert('Name field required only alphabet characters');
    // }
     if(email=='')
    {
        alert('Please enter your user email id');
    }
    else if (!filter.test(email))
    {
        alert('Invalid email');
    }
    else if(uname=='')
    {
        alert('Please enter the user name.');
    }
    else if(!letters.test(uname))
    {
        alert('User name field required only alphabet characters');
    }
    else if(pwd=='')
    {
        alert('Please enter Password');
    }
    else if(!pwd_expression.test(pwd))
    {
        alert ('Upper case, Lower case, Special character and Numeric letter are required in Password filed');
    }
    else if(document.signup.pwd.value.length < 6)
    {
        alert ('Password minimum length is 6');
    }
    else if(document.signup.pwd.value.length > 12)
    {
        alert ('Password max length is 12');
    }
    else
    {                                           
        

    }
}