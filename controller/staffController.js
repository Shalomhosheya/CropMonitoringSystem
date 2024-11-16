function saveToLocalStorage(data) {
    localStorage.setItem("staffData", JSON.stringify(data));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("staffData");
    return data ? JSON.parse(data) : [];
}

function populateTablestaff(staffData) {
    var firstname = document.getElementById('staffName');
    var secondName = document.getElementById('staffsecond');
    var designitation = document.getElementById('designation');
    var gender = document.getElementById('disabledSelect');
    var join_Date = document.getElementById('dateInput');
    var dob = document.getElementById('dateInput2');
    var address1 = document.getElementById('addresstext1');
    var address2 = document.getElementById('addresstext2');
    var address3 = document.getElementById('addresstext3');
    var address4 = document.getElementById('addresstext4');
    var address5 = document.getElementById('addresstext5');
    var contact_num = document.getElementById('contactNum');
    var email = document.getElementById('exampleInputEmail1');
    var role = document.getElementById('role');
    var field1 = document.getElementById('field');

    var label = document.getElementById('lbl2');

    const table = document.getElementById("tableBody");
    table.innerHTML = "";

    staffData.forEach((field) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <tr>
                <th data-field-id="${field.staffID}" class="clickableField">${field.staffID}</th>
                <td class="clickableField">${field.firstName}</td>
                <td class="clickableField">${field.lastName}</td>
                <td class="clickableField">${field.designation}</td>
                <td class="clickableField">${field.gender}</td>
                <td class="clickableField">${field.joinDate}</td>
                <td class="clickableField">${field.DOB}</td>
                <td class="clickableField">${field.address1}</td>
                <td class="clickableField">${field.address2}</td>
                <td class="clickableField">${field.address3}</td>
                <td class="clickableField">${field.address4}</td>
                <td class="clickableField">${field.address5}</td>
                <td class="clickableField">${field.contactNum}</td>
                <td class="clickableField">${field.email}</td>
                <td class="clickableField">${field.role}</td>
                <td class="clickableField">${field.field}</td>
            </tr>
        `;

        row.querySelector(".clickableField").addEventListener('click', function () {
            if (label) label.textContent = field.staffID;
            firstname.value = field.firstName;
            secondName.value = field.lastName;
            designitation.value = field.designation;
            gender.value = field.gender;
            join_Date.value = field.joinDate;
            dob.value = field.DOB;
            address1.value = field.address1;
            address2.value = field.address2;
            address3.value = field.address3;
            address4.value = field.address4;
            address5.value = field.address5;
            contact_num.value = field.contactNum;
            email.value = field.email;
            role.value = field.role;
            field1.value = field.field;
        });

        table.appendChild(row);
    });
}

// Example usage:

// Load data from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
    const staffData = loadFromLocalStorage();
    populateTablestaff(staffData);
});

// Add data to the table and save it to localStorage
function addStaffMember(newStaff) {
    const staffData = loadFromLocalStorage();
    staffData.push(newStaff);
    saveToLocalStorage(staffData);
    populateTablestaff(staffData);
}

// Example of adding a new staff member
const exampleStaff = {
    staffID: "1",
    firstName: "John",
    lastName: "Doe",
    designation: "Manager",
    gender: "Male",
    joinDate: "2023-01-01",
    DOB: "1990-01-01",
    address1: "123 Main St",
    address2: "Apt 4B",
    address3: "Cityville",
    address4: "Stateville",
    address5: "12345",
    contactNum: "123-456-7890",
    email: "john.doe@example.com",
    role: "Admin",
    field: "HR"
};

// Call this to add the example staff to the table and localStorage
// addStaffMember(exampleStaff);


function fetchDataAndDisplay() {
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/staff",
        type: "GET",
        success: function (response) {
            const essentialData = response.map(staff => ({
                staffID: staff.staffID,
                firstName: staff.firstName,
                lastName: staff.lastName,
                designation: staff.designation,
                gender: staff.gender,
                joinDate: staff.joinDate,
                DOB: staff.DOB,
                address1: staff.address1,
                address2: staff.address2,
                address3: staff.address3,
                address4: staff.address4,
                address5: staff.address5,
                contactNum: staff.contactNum,
                email: staff.email,
                role: staff.role,
                field: staff.field
            }));

            localStorage.setItem("staffData", JSON.stringify(essentialData));
            populateTablestaff(essentialData);
        }
    });
}


document.getElementById('addBtn').addEventListener('click', function () {
    var firstname = document.getElementById('staffName').value;
    var secondName = document.getElementById('staffsecond').value;
    var designitation = document.getElementById('designation').value;
    var gender = document.getElementById('disabledSelect').value;
    var join_Date = document.getElementById('dateInput').value;
    var dob = document.getElementById('dateInput2').value;
    var address1 = document.getElementById('addresstext1').value;
    var address2 = document.getElementById('addresstext2').value;
    var address3 = document.getElementById('addresstext3').value;
    var address4 = document.getElementById('addresstext4').value;
    var address5 = document.getElementById('addresstext5').value;
    var contact_num = document.getElementById('contactNum').value;
    var email = document.getElementById('exampleInputEmail1').value;
    var role = document.getElementById('role').value;
    var field = document.getElementById('field').value;

    // Console log to see all values before sending the request
    console.log({
        firstName: firstname,
        lastName: secondName,
        designation: designitation,
        gender: gender,
        joinDate: join_Date,
        DOB: dob,
        address1: address1,
        address2: address2,
        address3: address3,
        address4: address4,
        address5: address5,
        contactNum: contact_num,
        email: email,
        role: role,
        field: field
    });

    // Create FormData and append all values
    var formData = new FormData();
    formData.append("firstName", firstname);
    formData.append("lastName", secondName);
    formData.append("designation", designitation);
    formData.append("gender", gender);
    formData.append("joinDate", join_Date); // Ensure format is yyyy-MM-dd if necessary
    formData.append("DOB", dob);            // Ensure format is yyyy-MM-dd if necessary
    formData.append("address1", address1);
    formData.append("address2", address2);
    formData.append("address3", address3);
    formData.append("address4", address4);
    formData.append("address5", address5);
    formData.append("contacrnum", contact_num);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("field", field);

    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/staff/save",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function () {
            alert("Staff member added!");
            fetchDataAndDisplay();
        },
        error: function (xhr, status, error) {
            console.log("Error Details:", {
                xhr: xhr,
                status: status,
                error: error,
                response: xhr.responseText
            });
            alert("Failed to add staff member. Check console for details.");
        }
    });
});


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
document.addEventListener("DOMContentLoaded",function (){
    const roles =["Farming","Adminstration","Working","Cleaning"];
    const roleSelect = document.getElementById("role")
    roles.forEach(roles=>{
        const option = document.createElement("option");
        option.value = roles.toLowerCase();
        option.textContent = roles;
        roleSelect.appendChild(option)
    })
})

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
            fetchDataAndDisplay();
        },
        error:function (xhr,status,error){
            console.log(error);
            console.log(status);
            console.log(error);
            alert("update fail")
        }
    })
})
document.getElementById('deleteBtn2').addEventListener('click', function () {
    console.log("Delete button clicked");  // Check if this log appears in the console

    var staffID = document.getElementById("lbl2").textContent.trim();
    if (!staffID) {
        alert("Please select a field to delete.");
        return;
    }

    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/staff/" + encodeURIComponent(staffID),
        type: "DELETE",
        contentType: 'application/json',
        success: function (response) {
            console.log("Staff Successfully Deleted", response);
            alert("Staff Successfully Deleted");
            fetchDataAndDisplay();
            resettext()
        },
        error: function (xhr, status, error) {
            console.log("Error deleting Staff:", xhr, status, error);
            alert("Staff deletion failed");
        }
    });
});
function resettext() {
    const elements = [
        "staffName",
        "staffsecond",
        "designation",
        "disabledSelect",
        "dateInput",
        "dateInput2",
        "addresstext1",
        "addresstext2",
        "addresstext3",
        "addresstext4",
        "addresstext5",
        "contactNum",
        "exampleInputEmail1",
        "role",
        "field",
        "lbl2"
    ];

    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (id === "lbl2") {
                element.textContent = ""; // For labels
            } else {
                element.value = ""; // For input fields
            }
        } else {
            console.warn(`Element with id "${id}" not found.`);
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("resetBtn2").addEventListener("click", function () {
        resettext();
    });
});
