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
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/staff",
        type: "GET",
        success: function (response) {
            // Extracting essential data (e.g., staffID and staffName) from the response
            const essentialData = response.map(staff => ({
                staffID: staff.staffID,
                firstName: staff.firstName,
                lastName:staff.lastName// Adjust this field based on your API response
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

    if (storedVehicle) {
        populateTable(storedVehicle);
    }

    fetch("http://localhost:5050/backendCropMonitoringSystem/api/v1/vehicle")
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
        data:formdata,
      contentType :false,
      processData: false,
      success : function (){
          alert("Vehicle Reservation ADDED")
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

document.getElementById("resetBtn_R").addEventListener('click',function (){
    document.getElementById("staffID_R").value = "";
    document.getElementById("vehicleID_R").value = "";
     document.getElementById("reservedDate_R").value ="";
    document.getElementById("responseType_R").value = "";
    document.getElementById("reservationType_R").value = "";
    document.getElementById('lbl3').textContent ="";
});
document.getElementById('updateBtn_R').addEventListener('click',function (){
    const staffID = document.getElementById("staffID_R").value;
    const vehicleId = document.getElementById("vehicleID_R").value;
    const reservedDate = document.getElementById("reservedDate_R").value;
    const response = document.getElementById("responseType_R").value;
    const reservationType = document.getElementById("reservationType_R").value;
    const reservatioID = document.getElementById('lbl3').textContent;


});
