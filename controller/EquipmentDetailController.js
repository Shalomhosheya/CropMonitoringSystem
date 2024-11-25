document.addEventListener('DOMContentLoaded',function (){
    const staffIDdropDown = document.getElementById('staffID_ED')

    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/staff", // API endpoint
        type: "GET", // HTTP method
        success: function (response) {
            console.log("Staff data fetched successfully:", response);

            // Assuming the response is an array of staff objects with 'id' and 'name' properties
            response.forEach(equipDetail => {
                const option = document.createElement('option');
                option.value = equipDetail.staffID; // Set the value to staff ID
                option.textContent = `${equipDetail.staffID} - ${equipDetail.firstName}-${equipDetail.lastName}`; // Display ID and name
                staffIDdropDown.appendChild(option); // Add option to the dropdown
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch staff data:", error);
            alert("Failed to load staff data. Please try again.");
        }
    });
});

document.addEventListener('DOMContentLoaded',function (){
    const fieldIDropDown = document.getElementById('fieldID_ED');
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/field", // API endpoint
        type: "GET", // HTTP method
        success: function (response) {
            console.log("Staff data fetched successfully:", response);

            // Assuming the response is an array of staff objects with 'id' and 'name' properties
            response.forEach(equipDetail => {
                const option = document.createElement('option');
                option.value = equipDetail.fieldID; // Set the value to staff ID
                option.textContent = `${equipDetail.fieldID} - ${equipDetail.fieldName}`; // Display ID and name
                fieldIDropDown.appendChild(option); // Add option to the dropdown
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch Field data:", error);
            alert("Failed to load Field data. Please try again.");
        }
    });
})

document.addEventListener('DOMContentLoaded',function (){
    const equipIDDropdown = document.getElementById('equipID_ED')
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/equipment", // API endpoint
        type: "GET", // HTTP method
        success: function (response) {
            console.log("Staff data fetched successfully:", response);

            // Assuming the response is an array of staff objects with 'id' and 'name' properties
            response.forEach(equipDetail => {
                const option = document.createElement('option');
                option.value = equipDetail.equip_id; // Set the value to staff ID
                option.textContent = `${equipDetail.equip_id} - ${equipDetail.name}`; // Display ID and name
                equipIDDropdown.appendChild(option); // Add option to the dropdown
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch Equipment data:", error);
            alert("Failed to load Equipment data. Please try again.");
        }
    });
})
function loadDatatoTable() {
    const staffID = document.getElementById("staffID_ED");
    const fieldID = document.getElementById("fieldID_ED");
    const equipID = document.getElementById("equipID_ED");
    const date = document.getElementById("logDate_ED");
    const reason = document.getElementById("reason_Dis");
    const idLabel = document.getElementById('lbl6');

    const tableBody = document.querySelector("#vehicleTable tbody"); // Get the table body element

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Fetch data from the API
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/equip_details", // API endpoint
        type: "GET", // HTTP method
        success: function (response) {
            console.log("Equipment detail data fetched successfully:", response);

            // Populate table rows dynamically
            response.forEach(equipDetail => {
                const row = document.createElement("tr");

                // Create table cells with the fetched data
                row.innerHTML = `
                    <td class="clickableEquipDetails">${equipDetail.equip_detailsID}</td>
                    <td class="clickableEquipDetails">${equipDetail.staffID}</td>
                    <td class="clickableEquipDetails">${equipDetail.fieldID}</td>
                    <td class="clickableEquipDetails">${equipDetail.equip_id}</td>
                    <td class="clickableEquipDetails">${equipDetail.date}</td>
                    <td class="clickableEquipDetails">${equipDetail.resone}</td>
                `;

                // Add a click event to populate fields when a row is clicked
                row.addEventListener("click", function () {
                    idLabel.textContent = equipDetail.equip_detailsID;
                    staffID.value = equipDetail.staffID;
                    fieldID.value = equipDetail.fieldID;
                    equipID.value = equipDetail.equip_id;
                    date.value = equipDetail.date;
                    reason.value = equipDetail.resone;

                });

                // Append the row to the table body
                tableBody.appendChild(row);
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch Equipment Detail data:", error);
            alert("Failed to load Equipment Detail data. Please try again.");
        }
    });
}

// Add Equipment Detail data
document.getElementById("addBtn_ED").addEventListener("click", function () {
    const staffID = document.getElementById("staffID_ED").value;
    const fieldID = document.getElementById("fieldID_ED").value;
    const equipID = document.getElementById("equipID_ED").value;
    const date = document.getElementById("logDate_ED").value;
    const reason = document.getElementById("reason_Dis").value;

    var formdata = new FormData();
    formdata.append("staff_id", staffID);
    formdata.append("fieldID", fieldID);
    formdata.append("equip_id", equipID);
    formdata.append("date", date);
    formdata.append("reson", reason); // Corrected the key to 'reason'

    // POST request to save Equipment Detail
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/equip_details/save", // API endpoint
        type: "POST", // HTTP method
        data: formdata,
        contentType: false,
        processData: false,
        success: function (response) {
            alert("Equipment Detail added Successfully");
            console.log("Equipment Detail added:", response);

            // Reload the table with updated data
            loadDatatoTable();
        },
        error: function (xhr, status, error) {
            console.error("Failed to send Equipment Detail data:", error);
            alert("Failed to add Equipment Detail data. Please try again.");
        }
    });
});

// Call the loadDatatoTable function when the page loads
document.addEventListener("DOMContentLoaded", loadDatatoTable);

document.getElementById('resetBtn_ED').addEventListener('click',function (){
    resettext();
})
function resettext(){
    document.getElementById('staffID_ED').value=" ";
    document.getElementById('fieldID_ED').value=" ";
    document.getElementById('equipID_ED').value=" ";
    document.getElementById('logDate_ED').value=" ";
    document.getElementById('reason_Dis').value=" ";
    document.getElementById('lbl6').textContent=" ";
}

document.getElementById('updateBtn_ED').addEventListener('click',function (){
    const id = document.getElementById('lbl6').textContent;
})