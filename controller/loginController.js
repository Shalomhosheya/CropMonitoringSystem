document.getElementById("signUPBtn").addEventListener('click',function () {
event.preventDefault()
    var username= document.getElementById('usernameText').value;
    var email= document.getElementById('emailText').value;
    var password= document.getElementById('passwordtext').value;

    console.log(username, email, password);

    $.ajax({
       url:'',
       type:"POST",
        data:JSON.stringify({
           username:username,
           email:email,
           password:password
        }),

        contentType:'application/json',
        success:function (response){
            console.log("success "+response);
            alert("Account Successfully created")
        },
        error:function (xhr,status,error){
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert("Account creation failed")
        }
    });
})
document.getElementById("signInBTN").addEventListener('click',function (){
    alert("done");
    event.preventDefault()
    window.location.href="../pages/dashBoard.html"//only the html opens not the styles

})

document.addEventListener('DOMContentLoaded', function () {
    const array = ["MANAGER", "ADMINISTRATIVE", "SCIENTIST", "USER"];
    const selectElement = document.getElementById('roleselect');

    if (selectElement) {
        // Dynamically create and append options
        array.forEach(role => {
            const option = document.createElement('option');
            option.value = role.toLowerCase(); // Use lowercase as the value
            option.textContent = role; // Use the role name as the display text
            selectElement.appendChild(option);
        });
    } else {
        console.error("Select element with ID 'roleselect' not found.");
    }
});
