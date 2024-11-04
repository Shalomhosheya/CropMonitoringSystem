document.getElementById('addBTN').addEventListener('click',function (){
    console.log("add button click");
    var firstname=document.getElementById();
    var secondName=document.getElementById();
    var designitation=document.getElementById();
    var gender=document.getElementById();
    var join_Date=document.getElementById();
    var dob=document.getElementById();
    var address1=document.getElementById();
    var address2=document.getElementById();
    var address3=document.getElementById();
    var address4=document.getElementById();
    var address5=document.getElementById();
    var contact_num=document.getElementById();
    var email=document.getElementById();
    var role=document.getElementById();
    var field=document.getElementById();
    var staffIdlbl=document.getElementById();
})
document.addEventListener("DOMContentLoaded", function () {
    // Define your array of gender options
    const genders = ["Male", "Female"];

    // Get the select element
    const genderSelect = document.getElementById("disabledSelect");

    // Populate the select element with options from the array
    genders.forEach(gender => {
        const option = document.createElement("option");
        option.value = gender.toLowerCase(); // Optionally set a lowercase value
        option.textContent = gender;
        genderSelect.appendChild(option);
    });
});