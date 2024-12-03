
document.getElementById('image_Ml')?.addEventListener('change', function(event) {
    showPreview(event, 'previewImage3');
});
function showPreview(event, previewId) {
    const reader = new FileReader();
    reader.onload = function () {
        const previewImage = document.getElementById(previewId);
        previewImage.src = reader.result; // Set image preview src to uploaded image
    };
    reader.readAsDataURL(event.target.files[0]);
}
document.addEventListener('DOMContentLoaded', function () {
    const staffIDSelect = document.getElementById('staffID_Ml'); // Get the dropdown element

    const token = localStorage.getItem('token'); // Get the token from localStorage

    // Send GET request using jQuery's $.ajax
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/staff", // API endpoint
        type: "GET", // HTTP method
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (response) {
            console.log("Staff data fetched successfully:", response);

            // Assuming the response is an array of staff objects with 'id' and 'name' properties
            response.forEach(staff => {
                const option = document.createElement('option');
                option.value = staff.staffID; // Set the value to staff ID
                option.textContent = `${staff.staffID} - ${staff.firstName}-${staff.lastName}`; // Display ID and name
                staffIDSelect.appendChild(option); // Add option to the dropdown
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch staff data:", error);
            alert("Failed to load staff data. Please try again.");
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const fieldID = document.getElementById('fieldID_Ml'); // Get the field dropdown element
    const token = localStorage.getItem('token'); // Get the token from localStorage

    // Fetch field data
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/field", // API endpoint
        type: "GET", // HTTP method
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (response) {
            console.log("Field data fetched successfully:", response);

            // Assuming the response is an array of field objects with 'fieldID' and 'fieldName' properties
            response.forEach(field => {
                const option = document.createElement('option');
                option.value = field.fieldID; // Set value to fieldID
                option.textContent = `${field.fieldID} - ${field.fieldName}`; // Display fieldID and fieldName
                fieldID.appendChild(option); // Append option to the dropdown
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch field data:", error);
            alert("Failed to load field data. Please try again.");
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const cropsID = document.getElementById('cropID_Ml'); // Get the crops dropdown element
    const token = localStorage.getItem('token'); // Get the token from localStorage

  
    // Fetch crops data
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/vi/corpse", // API endpoint
        type: "GET", // HTTP method
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (response) {
            console.log("Crop data fetched successfully:", response);

            // Assuming the response is an array of crop objects with 'corpseID' and 'common_name' properties
            response.forEach(crop => {
                const option = document.createElement('option');
                option.value = crop.corpseID; // Set value to corpseID
                option.textContent = `${crop.corpseID} - ${crop.common_name}`; // Display corpseID and common_name
                cropsID.appendChild(option); // Append option to the dropdown
            });
            populateTableML();
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch crop data:", error);
            alert("Failed to load crop data. Please try again.");
        }
    });
});
function populateTableML() {
    const tableBody = document.querySelector("#equipmentTable tbody"); // Get the table body element
    const staffIDSelect = document.getElementById('staffID_Ml'); // Staff dropdown
    const fieldID = document.getElementById('fieldID_Ml'); // Field dropdown
    const cropsID = document.getElementById('cropID_Ml'); // Crops dropdown
    const logDate = document.getElementById('logDate_Ml'); // Log date input
    const observation = document.getElementById('observationDis_Ml'); // Observation input
    const observationImageInput = document.getElementById('image_Ml'); // Image input
    const idLabel = document.getElementById('lbl5'); // Label for the ID
    const token = localStorage.getItem('token'); // Get the token from localStorage

  
    // Fetch monitoring logs data using Fetch API
    fetch("http://localhost:5050/backendCropMonitoringSystem/api/vi/monitoringLog")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Monitoring logs fetched successfully:", data);

            // Save the response data in local storage
            localStorage.setItem("monitoringLogs", JSON.stringify(data));

            // Clear any existing table rows
            tableBody.innerHTML = "";

            // Populate the table
            data.forEach((log) => {
                const row = document.createElement("tr");

                // Create table cells for each log property
                row.innerHTML = `
                    <td class="clickableML" data-id="${log.monitoringL_id}" 
                        data-staff-id="${log.staffID}" 
                        data-corpse-id="${log.corpseID}" 
                        data-field-id="${log.fieldID}" 
                        data-log-date="${log.log_Date}" 
                        data-observation="${log.observation}">
                        ${log.monitoringL_id}
                    </td>
                    <td class="clickableMLD">${log.staffID}</td>
                    <td class="clickableMLD">${log.corpseID}</td>
                    <td class="clickableMLD">${log.fieldID}</td>
                    <td class="clickableMLD">${log.log_Date}</td>
                    <td class="clickableMLD">${log.observation}</td>
                `;

                // Append the row to the table
                tableBody.appendChild(row);
            });

            // Add click event to the table rows
            tableBody.addEventListener("click", function (event) {
                if (event.target.classList.contains("clickableML")) {
                    // Extract data attributes from the clicked cell
                    const monitoringLId = event.target.getAttribute("data-id");
                    const staffId = event.target.getAttribute("data-staff-id");
                    const corpseId = event.target.getAttribute("data-corpse-id");
                    const fieldId = event.target.getAttribute("data-field-id");
                    const logDateValue = event.target.getAttribute("data-log-date");
                    const observationText = event.target.getAttribute("data-observation");

                    // Populate the form fields
                    idLabel.textContent = monitoringLId;
                    staffIDSelect.value = staffId;
                    cropsID.value = corpseId;
                    fieldID.value = fieldId;
                    logDate.value = logDateValue;
                    observation.value = observationText;

                }
            });
        })
        .catch((error) => {
            console.error("Failed to fetch monitoring logs:", error);
            alert("Failed to load monitoring logs. Please try again.");
        });
}

populateTableML();
document.getElementById('addBtn_Ml').addEventListener('click', function () {
    const staffIDSelect = document.getElementById('staffID_Ml').value; // Get the staff dropdown value
    const fieldID = document.getElementById('fieldID_Ml').value; // Get the field dropdown value
    const cropsID = document.getElementById('cropID_Ml').value; // Get the crops dropdown value
    const logDate = document.getElementById('logDate_Ml').value; // Get the log date
    const observation = document.getElementById('observationDis_Ml').value; // Get the observation text
    const observationImageInput = document.getElementById('image_Ml'); // Get the image input element
    const token = localStorage.getItem('token'); // Get the token from localStorage

  
    // Check if the image input is not empty and get the file
    let observationImage = null;
    if (observationImageInput && observationImageInput.files.length > 0) {
        observationImage = observationImageInput.files[0];
    }

    // Create FormData object and append the values
    const formData = new FormData();
    formData.append("staffID", staffIDSelect);
    formData.append("fieldID", fieldID);
    formData.append("corpseID", cropsID);
    formData.append("log_Date", logDate);
    formData.append("observation", observation);
    if (observationImage) {
        formData.append("observed_image", observationImage); // Append the file
    }

    // Send the AJAX request
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/vi/monitoringLog/save",
        type: "POST",
        data: formData,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        processData: false, // Don't process the data (important for FormData)
        contentType: false, // Let the browser set the content type, including the boundary
        success: function (response) {
            console.log("Monitoring Log added successfully:", response);
            alert("Monitoring Log added successfully!");
        },
        error: function (xhr, status, error) {
            console.error("Failed to add Monitoring Log:", error);
            alert("Failed to add Monitoring Log. Please try again.");
        }
    });
});

document.getElementById('resetBtn_Ml').addEventListener('click',function (){
    resettext();
})

document.getElementById('deleteBtn_Ml').addEventListener('click', function () {
    const idLabel = document.getElementById('lbl5').textContent; // Get the ID from the label
    const token = localStorage.getItem('token'); // Get the token from localStorage

  
    // Confirm the deletion
    if (!idLabel) {
        alert("No record selected to delete.");
        return;
    }
    const confirmation = confirm(`Are you sure you want to delete record with ID: ${idLabel}?`);

    if (confirmation) {
        // AJAX request to delete the record
        $.ajax({
            url: `http://localhost:5050/backendCropMonitoringSystem/api/vi/monitoringLog/${idLabel}`, // Endpoint to delete the record
            type: "DELETE", // HTTP DELETE method
            headers: {
            'Authorization': 'Bearer'+ token // Add the token to the headers
            },
            success: function (response) {
                console.log("Record deleted successfully:", response);
                alert(`Record with ID: ${idLabel} has been deleted.`);
                populateTableML(); // Refresh the table after deletion
            },
            error: function (xhr, status, error) {
                console.error("Failed to delete record:", error);
                alert("Failed to delete record. Please try again.");
            }
        });
    }
});



function resettext(){
     document.getElementById('staffID_Ml').value=""; // Get the staff dropdown value
     document.getElementById('fieldID_Ml').value=""; // Get the field dropdown value
    document.getElementById('cropID_Ml').value=" "; // Get the crops dropdown value
    document.getElementById('logDate_Ml').value=" "; // Get the log date
     document.getElementById('observationDis_Ml').value=" "; // Get the observation text
    document.getElementById('image_Ml').value=""; // Get the image input element
    document.getElementById('lbl5').textContent="";
    document.getElementById("previewImage3").src="";

}
document.getElementById('updateBtn_Ml').addEventListener('click',function (){
    console.log("update Button clicked");
})