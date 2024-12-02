
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
 document.getElementById('signUPBtn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    var firstname = document.getElementById('usernameText').value;
    var lastname = document.getElementById('lastname').value;
    var role = document.getElementById('roleselect').value;
    var email = document.getElementById('emailText').value;
    var password = document.getElementById('passwordtext').value;

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVJNQU5BR0VSIn1dLCJzdWIiOiJzaGFsb21ob3NoZXlhMzdAZ21haWwuY29tIiwiaWF0IjoxNzMzMTI3MDgyLCJleHAiOjE3MzM0ODcwODJ9.UCZrrefdBRYGOVMRqoNUnJHP2-UBMqNZ7_XjkG2IxcU" //save the token to the local storage
    // Create FormData object
    const formData = new FormData();
    formData.append('firstName', firstname);
    formData.append('lastName', lastname);
    formData.append('role', role.toUpperCase());
    formData.append('email', email);
    formData.append('password', password);

    // AJAX request using FormData
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/auth/signup",
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: formData,
        processData: false, // Prevent jQuery from automatically processing the data
        contentType: false, // Tell jQuery not to set Content-Type header
        success: function (response) {
            console.log('Account created successfully:', response);
            alert('Account created successfully');
        },
        error: function (xhr, status, error) {
            console.error('Error creating Account:', error);
            alert('Error creating Account');
        }
    });
});


document.getElementById('signInBTN').addEventListener('click', function(){
    var email = document.getElementById('emailText2').value; 
    var password = document.getElementById('passwordtext2').value; 

    const token = //get the token from the local storage and set it

    $.ajax()
})