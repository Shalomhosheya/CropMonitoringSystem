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