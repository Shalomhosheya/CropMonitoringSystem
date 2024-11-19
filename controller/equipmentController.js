document.addEventListener('DOMContentLoaded',function (){
    const data = ["Metal","Plastic","Machinary"]
    const selectType = document.getElementById("type_E");
    data.forEach(equip =>{
        const option = document.createElement("option")
         option.value = equip.toLowerCase();
         option.textContent = equip
        selectType.append(option)
    })
})
document.addEventListener('DOMContentLoaded',function (){
    const data = ["Good Condition","Medium Condition","Bad Condition"]
    const selectType = document.getElementById("status_E");
    data.forEach(status =>{
        const option = document.createElement("option")
         option.value = status.toLowerCase();
         option.textContent = status
        selectType.append(option)
    })
})

document.getElementById("resetBtn_E").addEventListener('click',function (){
   resettext();
});
document.getElementById("updateBtn_E").addEventListener('click',function (){
    const id=document.getElementById('lbl4').textContent;
    const equipName=document.getElementById('equip_E').value;
    const type=document.getElementById('type_E').value;
    const status=document.getElementById('status_E').value;

    var formdata= new FormData();

    formdata.append("",id)
    formdata.append("",equipName)
    formdata.append("",type)
    formdata.append("",status)

    $.ajax({
     url:"http://localhost:5050/backendCropMonitoringSystem/api/v1/equipment/"+encodeURIComponent(id),
     type:"PUT",
     contentType:false,
     processData:false,
     success:function (){
         alert("update successfully")
     },
     error:function (xhr,status,error){
         console(xhr,status,error)
         alert("update failed")

     }
    });
});

fetchdata();
function resettext(){
    document.getElementById('lbl4').textContent="";
    document.getElementById('equip_E').value="";
    document.getElementById('type_E').value="";
    document.getElementById('status_E').value="";
}
document.getElementById("addBtn_E").addEventListener("click", function () {
    const id = document.getElementById('lbl4').textContent;
    const equipName = document.getElementById('equip_E').value;
    const type = document.getElementById('type_E').value;
    const status = document.getElementById('status_E').value;

    console.log(id, equipName, type, status);

    const formdata = new FormData();
    formdata.append("name", equipName);
    formdata.append("type", type);
    formdata.append("status", status);

    // Save equipment data via POST request
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/equipment/save",
        type: "POST",
        data: formdata,
        contentType: false,
        processData: false,
        success: function () {
            alert("Added equipment successfully");
            fetchdata(); // Refresh table after successful addition
        },
        error: function (xhr, status, error) {
            console.error("Error Details:", {
                xhr: xhr,
                status: status,
                error: error,
                response: xhr.responseText
            });
            alert("Equipment addition failed");
        }
    });
});

function fetchdata() {
    // Fetch stored data from localStorage if available
    const storedData = localStorage.getItem("equipmentData");

    if (storedData){
        populateTable(storedData)
    }
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/equipment", // Correct API endpoint
        type: "GET",
        success: function (response) {
            const essential = response.map(equip => ({
                equip_id: equip.equip_id,
                name: equip.name,
                type: equip.type,
                status: equip.status
            }));

            try {
                // Store the fetched data in localStorage
                localStorage.setItem("equipmentData", JSON.stringify(essential));
            } catch (e) {
                console.error("Failed to store data in localStorage:", e);
            }

            populateTable(essential); // Populate the table with the data
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch equipment data:", error);
        }
    });
}

function populateTable(data) {
    const table = document.querySelector("#equipmentTable tbody");
    table.innerHTML = ""; // Clear existing rows

    // Iterate over the data and dynamically create rows
    data.forEach((equip, index) => {
        const row = document.createElement("tr");

        // Create and populate table cells
        const equipIdCell = document.createElement("td");
        equipIdCell.textContent = equip.equip_id;

        const nameCell = document.createElement("td");
        nameCell.textContent = equip.name;

        const typeCell = document.createElement("td");
        typeCell.textContent = equip.type;

        const statusCell = document.createElement("td");
        statusCell.textContent = equip.status;

        // Append cells to the row
        row.appendChild(equipIdCell);
        row.appendChild(nameCell);
        row.appendChild(typeCell);
        row.appendChild(statusCell);

        // Append the row to the table
        table.appendChild(row);
    });
}