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


fetchdata();
function resettext(){
    document.getElementById('lbl4').textContent="";
    document.getElementById('equip_E').value="";
    document.getElementById('type_E').value="";
    document.getElementById('status_E').value="";
}
document.getElementById("addBtn_E").addEventListener("click", function () {
    const equipName = document.getElementById('equip_E').value;
    const type = document.getElementById('type_E').value;
    const status = document.getElementById('status_E').value;

    // Set the Bearer token
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVJVU0VSIn1dLCJzdWIiOiJzaGFsb21ob3NoZXlhMzQ1MEBnbWFpbC5jb20iLCJleHAiOjE3MzMxNTQ5NTl9.VfiY-ntr-a-iTvzFbNuLe4CjXKrNSUQ--b1zxCU1QSc";

    console.log("Adding Equipment:", { equipName, type, status });

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
        headers: {
            "Authorization": `Bearer ${token}` // Include Bearer token
        },
        success: function (response) {
            alert("Added equipment successfully");
            console.log("Response from POST:", response);
            fetchdata(); // Refresh table after successful addition
        },
        error: function (xhr, status, error) {
            console.error("Error during POST:", {
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
    const storedData = localStorage.getItem("equipmentData");

    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            if (Array.isArray(parsedData)) {
                populateTable(parsedData);
            } else {
                console.error("Stored data is not an array:", parsedData);
            }
        } catch (error) {
            console.error("Failed to parse stored data:", error);
        }
    }
    fetch("http://localhost:5050/backendCropMonitoringSystem/api/v1/equipment")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse JSON data from response
        })
        .then(data => {
            console.log("Response from GET:", data);

            // Assuming equip_id might be missing, ensure data is enriched
            const essential = data.map((equip, index) => ({
                equip_id: equip.equip_id || `TempID-${index + 1}`, // Assign a temp ID if missing
                name: equip.name,
                type: equip.type,
                status: equip.status
            }));

            try {
                localStorage.setItem("equipmentData", JSON.stringify(essential));
            } catch (e) {
                console.error("Failed to store data in localStorage:", e);
            }

            populateTable(essential); // Populate the table with the enriched data
        })
        .catch(error => {
            console.error("Failed to fetch equipment data:", error);
        });

}

function populateTable(data) {
    console.log("Populating Table with Data:", data);

    if (!Array.isArray(data)) {
        console.error("Data is not an array:", data);
        return;
    }

    const tableBody = document.querySelector("#equipmentTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    data.forEach((equip) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row"class="equip_table">${equip.equip_id}</th>
            <td class="equip_table">${equip.name}</td>
            <td class="equip_table">${equip.type}</td>
            <td class="equip_table">${equip.status}</td>
        `;

        // Add click event listener to populate input fields
        row.addEventListener("click", function () {
            document.getElementById('lbl4').textContent = equip.equip_id; // Update label
            document.getElementById('equip_E').value = equip.name;        // Update input field
            document.getElementById('type_E').value = equip.type;         // Update input field
            document.getElementById('status_E').value = equip.status;     // Update input field
        });

        tableBody.appendChild(row); // Append the row to the table
    });
}
document.getElementById("updateBtn_E").addEventListener('click', function () {
    const id = document.getElementById('lbl4').textContent;
    const equipName = document.getElementById('equip_E').value;
    const type = document.getElementById('type_E').value;
    const status = document.getElementById('status_E').value;

    // Create a JSON object with the necessary fields
    const data = {
        equip_id: id,
        name: equipName,
        type: type,
        status: status
    };

    // Send the PUT request using jQuery's $.ajax with JSON data
    $.ajax({
        url: `http://localhost:5050/backendCropMonitoringSystem/api/v1/equipment/${encodeURIComponent(id)}`,
        type: "PUT",
        contentType: "application/json",  // Set the content type to JSON
        data: JSON.stringify(data),  // Convert the JavaScript object to a JSON string
        success: function (response) {
            alert("Update successful");
            console.log("Update response:", response);
            fetchdata()
        },
        error: function (xhr, status, error) {
            console.error("Update failed:", error);
            alert("Update failed");
        }
    });
});


document.getElementById('deleteBtn_E').addEventListener('click', function () {
    const id = document.getElementById('lbl4').textContent;

    if (!id) {
        alert("No ID specified for deletion.");
        return;
    }

    // Confirm the deletion action
    const confirmDelete = confirm(`Are you sure you want to delete equipment with ID: ${id}?`);
    if (!confirmDelete) return;

    // Perform the DELETE request using jQuery AJAX
    $.ajax({
        url: `http://localhost:5050/backendCropMonitoringSystem/api/v1/equipment/${encodeURIComponent(id)}`,
        type: "DELETE",
        success: function (data) {
            alert("Deletion successful");
            console.log("Delete response:", data);

            // Optionally, refresh the data in your table
            fetchdata();
        },
        error: function (xhr, status, error) {
            console.error("Deletion failed:", error);
            alert("Failed to delete equipment.");
        }
    });
});
