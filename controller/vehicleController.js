document.addEventListener("DOMContentLoaded",function (){
    const vehiclecatergory =["Truck","Car","Bike","CropCutter","LandMaster"];
    const vehiclecatergorySelect = document.getElementById("disabledSelect1")
    vehiclecatergory.forEach(vehiclecatergory=>{
        const option = document.createElement("option");
        option.value = vehiclecatergory.toLowerCase();
        option.textContent = vehiclecatergory;
        vehiclecatergorySelect.appendChild(option)
    })
})
document.addEventListener("DOMContentLoaded",function (){
    const fuelType =["Petrol","Diesel","Kerosone"];
    const fuelTypeSelect = document.getElementById("disabledSelect2")
    fuelType.forEach(fuelType=>{
        const option = document.createElement("option");
        option.value = fuelType.toLowerCase();
        option.textContent = fuelType;
        fuelTypeSelect.appendChild(option)
    })
})
document.addEventListener("DOMContentLoaded",function (){
    const status =["Taken","Not Taken"];
    const statusSelect = document.getElementById("disabledSelect4")
    status.forEach(status=>{
        const option = document.createElement("option");
        option.value = status.toLowerCase();
        option.textContent = status;
        statusSelect.appendChild(option)
    })
})
document.getElementById("addBtnV").addEventListener('click',function (){
    const vehicleCategory = document.getElementById("disabledSelect1").value;
    const fuelType = document.getElementById("disabledSelect2").value;
    const remarks = document.getElementById("remarksV").value;
    const status = document.getElementById("disabledSelect4").value;
    const licenseNumberPlate = document.getElementById("numberPlateV").value;
    const token = localStorage.getItem('token'); // Get the token from localStorage

    console.log(vehicleCategory, fuelType, remarks, status, licenseNumberPlate);
    var formData = new FormData;
    formData.append("vehicleCategory",vehicleCategory)
    formData.append("fuelType",fuelType)
    formData.append("remarks",remarks)
    formData.append("status",status)
    formData.append("licenseNumberPlate",licenseNumberPlate)

    $.ajax({
        url:"http://localhost:5050/backendCropMonitoringSystem/api/v1/vehicle/save",
        type:"POST",
        data: formData,
        headers: {
            "Authorization": `Bearer ${token}` // Include Bearer token
        },
        contentType: false,
        processData: false,
        success: function () {
            console.log("vehicle successfully added");
            alert("vehicle successfully added");
            // resettext();
             fetchAndDisplayFields();
        },
        error: function (xhr, status, error) {
            console.log("Error details:", xhr, status, error);
            alert("vehicle adding crendential failed");
        }
    });
})
function fetchAndDisplayFields() {
    const storedVehicle = JSON.parse(localStorage.getItem("vehiclesData"));
    const token = localStorage.getItem('token'); // Get the token from localStorage

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

            populateTable(essentialData);
        })
        .catch(error => console.error("Error fetching vehicle data:", error));
}


function populateTable(data) {
    const vehicleCategory = document.getElementById("disabledSelect1");
    const fuelType = document.getElementById("disabledSelect2");
    const remarks = document.getElementById("remarksV");
    const status = document.getElementById("disabledSelect4");
    const licenseNumberPlate = document.getElementById("numberPlateV");
    const label1 = document.getElementById("lbl3");
    // Fetch the input fields

    const tableBody = document.querySelector("#vehicleTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    // Append each field data to the table
    data.forEach((vehicle, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <tr >
            <th class="rowSelect clickable-field-id" scope="row">${vehicle.vehicleID}</th>
            <td class="rowSelect clickable-field-id">${vehicle.vehicleCategory}</td>
            <td class="rowSelect clickable-field-id">${vehicle.fuelType}</td>
            <td class="rowSelect clickable-field-id">${vehicle.remarks}</td>
            <td class="rowSelect clickable-field-id">${vehicle.status}</td>
            <td class="rowSelect clickable-field-id">${vehicle.licenseNumberPlate}</td>
          </tr>

        `;

        // Add click event listener to display details in labels and input fields
        row.querySelector(".clickable-field-id").addEventListener("click", function () {
            label1.textContent = vehicle.vehicleID;  // Update the label with the clicked fieldID
            vehicleCategory.value = vehicle.vehicleCategory;       // Set value in input
            fuelType.value = vehicle.fuelType;    // Set value in input
            remarks.value = vehicle.remarks;       // Set value in input
            status.value = vehicle.status;          // Set value in input
            licenseNumberPlate.value = vehicle.licenseNumberPlate;          // Set value in input

        });

        tableBody.appendChild(row);
    });
}
fetchAndDisplayFields();

document.getElementById("deleteBtnVvv").addEventListener('click',function (){
    console.log("delete button clicked")
  const vehicleID= document.getElementById('lbl3').textContent.trim();
  const token = localStorage.getItem('token'); // Get the token from localStorage

  $.ajax({
      url:"http://localhost:5050/backendCropMonitoringSystem/api/v1/vehicle/"+encodeURIComponent(vehicleID),
      type:"DELETE",
      data: "application/json",
      header:{
        'Authorization': 'Bearer'+ token
      },
      success: function (response) {
          console.log("vehicle Successfully Deleted", response);
          alert("Vehicle  Successfully Removed");
          fetchAndDisplayFields();
          // resettext()
      },
      error: function (xhr, status, error) {
          console.log("Error deleting field:", xhr, status, error);
          alert("Vehicle deletion crendential failed");
      }
  });
});
document.getElementById("updateBtnV").addEventListener('click',function (){

    const vehicleCategory = document.getElementById("disabledSelect1").value;
    const fuelType = document.getElementById("disabledSelect2").value;
    const remarks = document.getElementById("remarksV").value;
    const status = document.getElementById("disabledSelect4").value;
    const licenseNumberPlate = document.getElementById("numberPlateV").value;

    const vehicleID= document.getElementById('lbl3').textContent.trim();
    const token = localStorage.getItem('token'); // Get the token from localStorage


    console.log(vehicleCategory, fuelType, remarks, status, licenseNumberPlate);

    var formdata= new FormData;
    formdata.append("vehicleCategory",vehicleCategory)
    formdata.append("fuelType",fuelType)
    formdata.append("remarks",remarks)
    formdata.append("status",status)
    formdata.append("licenseNumberPlate",licenseNumberPlate)
    $.ajax({
        url:"http://localhost:5050/backendCropMonitoringSystem/api/v1/vehicle/"+ encodeURIComponent(vehicleID),
        type:"PUT",
        data: formdata,
        header: {
        'Authorization': 'Bearer'+ token
        },
        contentType: false,
        processData: false,
        success: function (response) {
            console.log("vehicle Successfully Updated", response);
            alert("Vehicle  Successfully Updated");
            fetchAndDisplayFields();
            // resettext()
        },
        error: function (xhr, status, error) {
            console.log("Error Update field:", xhr, status, error);
            alert("Vehicle Update crendential failed");
        }
    });
});
document.getElementById("resetBtnV").addEventListener("click", function(){
resetText()

});

function resetText() {
    
    const vehicleCategory = document.getElementById("disabledSelect1").value=" ";
    const fuelType = document.getElementById("disabledSelect2").value=" ";
    const remarks = document.getElementById("remarksV").value=" ";
    const status = document.getElementById("disabledSelect4").value="";
    const licenseNumberPlate = document.getElementById("numberPlateV").value="";

    const vehicleID= document.getElementById('lbl3').textContent =" ";
} 