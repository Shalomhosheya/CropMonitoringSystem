function populateTablestaff(staffData) {
    var firstname=document.getElementById('staffName').value;
    var secondName=document.getElementById('staffsecond').value;
    var designitation=document.getElementById('designation').value;
    var gender=document.getElementById('disabledSelect').value;
    var join_Date=document.getElementById('dateInput').value;
    var dob=document.getElementById('dateInput2').value;
    var address1=document.getElementById('addresstext1').value;
    var address2=document.getElementById('addresstext2').value;
    var address3=document.getElementById('addresstext3').value;
    var address4=document.getElementById('addresstext4').value;
    var address5=document.getElementById('addresstext5').value;
    var contact_num=document.getElementById('contactNum').value;
    var email=document.getElementById('exampleInputEmail1').value;
    var role=document.getElementById('role').value;
    var field=document.getElementById('field').value;

    var staffIdlbl=document.getElementById('lbl2').value;

}

function fetchDataAndDisplay() {
    const staffData = JSON.parse(localStorage.getItem("staffData"))
    if (staffData) {
        populateTablestaff(staffData)
    }

}

document.getElementById('addBtn').addEventListener('click',function (){
    console.log("add button click");
    var firstname=document.getElementById('staffName').value;
    var secondName=document.getElementById('staffsecond').value;
    var designitation=document.getElementById('designation').value;
    var gender=document.getElementById('disabledSelect').value;
    var join_Date=document.getElementById('dateInput').value;
    var dob=document.getElementById('dateInput2').value;
    var address1=document.getElementById('addresstext1').value;
    var address2=document.getElementById('addresstext2').value;
    var address3=document.getElementById('addresstext3').value;
    var address4=document.getElementById('addresstext4').value;
    var address5=document.getElementById('addresstext5').value;
    var contact_num=document.getElementById('contactNum').value;
    var email=document.getElementById('exampleInputEmail1').value;
    var role=document.getElementById('role').value;
    var field=document.getElementById('field').value;

    var staffIdlbl=document.getElementById('lbl2').value;

    console.log(firstname, secondName, designitation, gender, join_Date, dob, address1, address2, address3, address4, address5, contact_num, email, role, field);

    var formData = new FormData();
    formData.append("firstName",firstname);
    formData.append("lastName",secondName);
    formData.append("designation",designitation);
    formData.append("gender",gender);
    formData.append("joinDate",join_Date);
    formData.append("DOB",dob);
    formData.append("address1",address1);
    formData.append("address2",address2);
    formData.append("address3",address3);
    formData.append("address4",address4);
    formData.append("address5",address5);
    formData.append("contacrnum",contact_num);
    formData.append("email",email);
    formData.append("role",role);
    formData.append("field",field);



    $.ajax({
        url:"http://localhost:5050/backendCropMonitoringSystem/api/v1/staff/save",
        type:"POST",
        data:formData,
        contentType:false,
        processData:false,
        success:function (){
            alert("staff member added!")
            fetchDataAndDisplay();
        },
        error:function (xhr,status,error){
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert("staff member adding crendential fail")
        }

    })
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
document.getElementById('updateBtn').addEventListener('click',function (){
    var firstname=document.getElementById('staffName').value;
    var secondName=document.getElementById('staffsecond').value;
    var designitation=document.getElementById('designation').value;
    var gender=document.getElementById('disabledSelect').value;
    var join_Date=document.getElementById('dateInput').value;
    var dob=document.getElementById('dateInput2').value;
    var address1=document.getElementById('addresstext1').value;
    var address2=document.getElementById('addresstext2').value;
    var address3=document.getElementById('addresstext3').value;
    var address4=document.getElementById('addresstext4').value;
    var address5=document.getElementById('addresstext5').value;
    var contact_num=document.getElementById('contactNum').value;
    var email=document.getElementById('exampleInputEmail1').value;
    var role=document.getElementById('role').value;
    var field=document.getElementById('field').value;

    var data = {
        firstname:firstname,
        secondName:secondName,
        designitation:designitation,
        gender:gender,
        join_Date:join_Date,
        dob:dob,
        address1:address1,
        address2:address2,
        address3:address3,
        address4:address4,
        address5:address5,
        contact_num:contact_num,
        email:email,
        role:role,
        field:field
    }

    $.ajax({
        url:"",
        type:"POST",
        data:JSON.stringify(data),
        contentType:"application/json",
        success:function (){
            alert("Update success")
        },
        error:function (xhr,status,error){
            console.log(error);
            console.log(status);
            console.log(error);
            alert("update fail")
        }
    })
})