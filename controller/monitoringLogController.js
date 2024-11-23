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
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch crop data:", error);
            alert("Failed to load crop data. Please try again.");
        }
    });
});
