document.addEventListener('DOMContentLoaded',function (){
    const response = ["Available","Not Avaialable"];
    const responseSelect = document.getElementById("responseType_R")
    response.forEach(reservation =>{
        const option = document.createElement('option')
        option.value = reservation.toLowerCase()
        option.textContent = reservation;
        responseSelect.append(option)
    })
})
document.addEventListener('DOMContentLoaded',function (){
    const reservationType = ["Personal Use","Work","Carraige","Emegenercy"];
    const reservationTypeSelect = document.getElementById("reservationType_R")
    reservationType.forEach(reservationType =>{
        const option = document.createElement('option')
        option.value = reservationType.toLowerCase()
        option.textContent = reservationType;
        reservationTypeSelect.append(option)
    })
});
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/staff",
        type: "GET",
        headers: { // Correct key for headers
            Authorization: `Bearer ${token}` // Include the token in the Authorization header
        },
        success: function (response) {
            // Extracting essential data (e.g., staffID and staffName) from the response
            const essentialData = response.map(staff => ({
                staffID: staff.staffID,
                firstName: staff.firstName,
                lastName: staff.lastName // Adjust this field based on your API response
            }));

            localStorage.setItem("staffData", JSON.stringify(essentialData));

            populateTablestaff(essentialData);
        },
        error: function (error) {
            console.error("Failed to fetch staff data:", error);
        }
    });

    // Function to populate the select input
    function populateTablestaff(staffData) {
        const staffIDSelect = document.getElementById("staffID_R");

        // Clear existing options (if any)
        staffIDSelect.innerHTML = "";

        // Add a default option (optional)
        const defaultOption = document.createElement("option");
        defaultOption.text = "Select Staff member";
        defaultOption.value = "";
        staffIDSelect.appendChild(defaultOption);

        // Add options for each staff member
        staffData.forEach(staff => {
            const option = document.createElement("option");
            option.value = staff.staffID; // Set the value of the option
            option.text = `${staff.staffID} - ${staff.firstName} ${staff.lastName}`; // Display staffID and name
            staffIDSelect.appendChild(option);
        });
    }
});

document.addEventListener('DOMContentLoaded',function (){
    const storedVehicle = JSON.parse(localStorage.getItem("vehiclesData"));
    const token = localStorage.getItem("token");
    // if (storedVehicle) {
    //     populateTable(storedVehicle);
    // }

    fetch("http://localhost:5050/backendCropMonitoringSystem/api/v1/vehicle",{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const essentialData = data.map(vehicle => ({
                vehicleID: vehicle.vehicleID,
                vehicleCategory: vehicle.vehicleCategory,
                fuelType: vehicle.fuelType,
                remarks: vehicle.remarks,
                status: vehicle.status,
                licenseNumberPlate: vehicle.licenseNumberPlate
            }));

            try {
                localStorage.setItem("vehiclesData", JSON.stringify(essentialData));
            } catch (e) {
                console.error("Failed to store data in local storage:", e);
            }

            populateTable1(essentialData);
        })
        .catch(error => console.error("Error fetching vehicle data:", error));
})
function populateTable1(vehicleData){
    const vehicleIDSelect = document.getElementById('vehicleID_R');
    vehicleIDSelect.innerHTML="";

    const defaultOption = document.createElement("option");
    defaultOption.text = "Select VEHICLE";
    defaultOption.value = "";
    vehicleIDSelect.appendChild(defaultOption);

    vehicleData.forEach(vehicle=>{

        const option = document.createElement("option");
        option.value = vehicle.vehicleID; // Set the value of the option
        option.text = `${vehicle.vehicleID} - ${vehicle.vehicleCategory} ${vehicle.licenseNumberPlate}`; // Display staffID and name
        vehicleIDSelect.appendChild(option);
    })
}
document.getElementById("addBtn_R").addEventListener('click',function (){
 const staffID = document.getElementById("staffID_R").value;
 const vehicleId = document.getElementById("vehicleID_R").value;
 const reservedDate = document.getElementById("reservedDate_R").value;
 const response = document.getElementById("responseType_R").value;
 const reservationType = document.getElementById("reservationType_R").value;
 const token = localStorage.getItem('token'); // Get the token from localStorage

    console.log(staffID, vehicleId, reservedDate, response, reservationType);
    var formdata = new FormData;
    formdata.append("staffId",staffID);
    formdata.append("vehicleId",vehicleId);
    formdata.append("date",reservedDate);
    formdata.append("response",response);
    formdata.append("reervationtype",reservationType);

    $.ajax({
      url:"http://localhost:5050/backendCropMonitoringSystem/api/v1/reservstion/save",
      type:"POST",
      headers: {
        "Authorization": `Bearer ${token}` // Include Bearer token
      },
      data:formdata,
      contentType :false,
      processData: false,
      success : function (){
          alert("Vehicle Reservation ADDED")
          populateTable2()
      },
      error:function (xhr,error,status){
          console.log("Error Details:", {
              xhr: xhr,
              status: status,
              error: error,
              response: xhr.responseText
          });
          alert("Failed to add Reservation. Check console for details.");

      }
    })

});
function populateTable2() {
    const staffInput = document.getElementById("staffID_R");
    const vehicleInput = document.getElementById("vehicleID_R");
    const reservedDateInput = document.getElementById("reservedDate_R");
    const responseTypeInput = document.getElementById("responseType_R");
    const reservationTypeInput = document.getElementById("reservationType_R");
    const reservationIdLabel = document.getElementById("lbl3");
    const token = localStorage.getItem('token'); 


    fetch("http://localhost:5050/backendCropMonitoringSystem/api/v1/reservstion", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Storing the response in localStorage
            localStorage.setItem("reservationData", JSON.stringify(data));

            // Selecting the table body to append rows
            const tableBody = document.querySelector("#fieldsTable tbody");

            // Clearing existing rows to avoid duplication
            tableBody.innerHTML = "";

            // Populating the table with reservation data
            data.forEach(reservation => {
                console.log("Reservation object:", reservation); // Debugging log

                const row = document.createElement("tr");

                // Ensure property names match the backend response
                row.innerHTML = `
                    <td class="clickableField reservationTable">${reservation.reservationID}</td>
                    <td class="clickableField reservationTable">${reservation.staffID}</td>
                    <td class="clickableField reservationTable">${reservation.vehicleId}</td>
                    <td class="clickableField reservationTable">${reservation.date}</td>
                    <td class="clickableField reservationTable">${reservation.response}</td>
                    <td class="clickableField reservationTable">${reservation.reervationtype}</td>
                `;

                // Add event listener for click on each row
                row.addEventListener('click', function () {
                    // Populate the form fields with the clicked row's data
                    reservationIdLabel.textContent = reservation.reservationID;
                    staffInput.value = reservation.staffID;
                    vehicleInput.value = reservation.vehicleId;
                    reservedDateInput.value = reservation.date;
                    responseTypeInput.value = reservation.response;
                    reservationTypeInput.value = reservation.reervationtype;

                    console.log("Row data loaded into form for editing:", reservation);
                });

                tableBody.appendChild(row);
            });

            console.log("Table populated successfully!");
        })
        .catch(error => {
            console.error("Error fetching reservation data:", error);
            alert("Failed to fetch reservation data. Check console for details.");
        });
}

populateTable2();
document.getElementById("resetBtn_R").addEventListener('click',function (){
   resettext();
});

function resettext(){
    document.getElementById("staffID_R").value = "";
    document.getElementById("vehicleID_R").value = "";
    document.getElementById("reservedDate_R").value ="";
    document.getElementById("responseType_R").value = "";
    document.getElementById("reservationType_R").value = "";
    document.getElementById('lbl3').textContent ="";
}
document.getElementById('updateBtn_R').addEventListener('click', function () {
    const staffID = document.getElementById("staffID_R").value;
    const vehicleId = document.getElementById("vehicleID_R").value;
    const date = document.getElementById("reservedDate_R").value;
    const response = document.getElementById("responseType_R").value;
    const reervationtype = document.getElementById("reservationType_R").value;
    const reservatioID = document.getElementById('lbl3').textContent;
    const token = localStorage.getItem('token'); // Get the token from localStorage

    // Creating the JSON object
    const jsonData = {
        staffID: staffID,
        vehicleId: vehicleId,
        date: date,
        response: response,
        reervationtype: reervationtype
    };

    // Sending the AJAX request with JSON payload
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/reservstion/" + encodeURIComponent(reservatioID),
        type: "PUT",
        headers: {
            "Authorization": `Bearer ${token}` // Include Bearer token
        },
        method: "PUT", // Update the method to PUT for HTTP method
        data: JSON.stringify(jsonData), // Convert the object to JSON
        contentType: "application/json", // Specify content type as JSON
        processData: false, // No need to process data
        success: function (response) {
            console.log("Reservation Updated", response);
            alert("Reservation Updated");
            populateTable2();
            // resettext();
        },
        error: function (xhr, status, error) {
            console.log("Error updating reservation:", xhr, status, error);
            alert("Reservation update failed. Check console for details.");
        }
    });
});
document.getElementById('deleteBtn_R').addEventListener('click',function (){
    const reservatioID = document.getElementById('lbl3').textContent;
    const token = localStorage.getItem('token'); // Get the token from localStorage

    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/reservstion/" + encodeURIComponent(reservatioID),
        type: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}` // Include Bearer token
        },
        contentType: 'application/json',
        success: function (response) {
            console.log("Reservation  Removed", response);
            alert("Reservation  Removed");
            populateTable2();
            resettext();
        },
        error: function (xhr, status, error) {
            console.log("Error deleting Staff:", xhr, status, error);
            alert("Reservation not removed");
        }
    });

});