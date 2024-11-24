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
})