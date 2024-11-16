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