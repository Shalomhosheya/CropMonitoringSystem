
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

    // Send GET request using jQuery's $.ajax
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/staff", // API endpoint
        type: "GET", // HTTP method
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

    // Fetch field data
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/field", // API endpoint
        type: "GET", // HTTP method
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

    // Fetch crops data
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/vi/corpse", // API endpoint
        type: "GET", // HTTP method
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

    // Fetch monitoring logs data
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/vi/monitoringLog", // API endpoint
        type: "GET", // HTTP method
        success: function (response) {
            console.log("Monitoring logs fetched successfully:", response);

            // Save the response data in local storage
            localStorage.setItem("monitoringLogs", JSON.stringify(response));

            // Clear any existing table rows
            tableBody.innerHTML = "";

            // Populate the table
            response.forEach(log => {
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
                    <td>${log.staffID}</td>
                    <td>${log.corpseID}</td>
                    <td>${log.fieldID}</td>
                    <td>${log.log_Date}</td>
                    <td>${log.observation}</td>
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

                    alert(`Selected Log ID: ${monitoringLId}`);
                }
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch monitoring logs:", error);
            alert("Failed to load monitoring logs. Please try again.");
        }
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

document.getElementById('deleteBtn_C').addEventListener('click',function (){

})

document.getElementById('updateBtn_C').addEventListener('click',function (){

})


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

