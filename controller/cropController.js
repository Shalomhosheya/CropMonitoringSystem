document.addEventListener('DOMContentLoaded',function (){
    const data = ["Cereals","Legumes","Fruits","Corn", "crops"];
    const selectCategory = document.getElementById('category_C');
 data.forEach(crop =>{
     const option = document.createElement("option");
     option.value = crop.toLowerCase();
     option.textContent = crop;
     selectCategory.appendChild(option)
     }
 )
});
document.addEventListener('DOMContentLoaded',function (){
    const data = ["Summer","Autumn","Drought","Rainny"];
    const selectCropSeason = document.getElementById('cropSeason_C');

    data.forEach(season =>{
            const option = document.createElement("option");
            option.value = season.toLowerCase();
            option.textContent = season;
            selectCropSeason.appendChild(option)
        }
    )
});
document.getElementById('addBtn_C').addEventListener('click', function () {
    const category = document.getElementById('category_C').value;
    const commonName = document.getElementById('cropName_C').value;
    const cropImage = document.getElementById('inputGroupFile01')?.files[0] || null; // Get the file object
    const cropScientific = document.getElementById('cropScientific_C').value;
    const cropSeason = document.getElementById('cropSeason_C').value;
    const token = localStorage.getItem('token'); // Get the token from localStorage


    console.log(category, commonName, cropImage, cropScientific, cropSeason);

    // Create FormData
    const formData = new FormData();
    formData.append("category", category);
    formData.append("common_name", commonName);
    formData.append("crop_image", cropImage); // Appending file
    formData.append("crop_scientific_name", cropScientific);
    formData.append("crop_season", cropSeason);

    // Send data to the backend
    fetch("http://localhost:5050/backendCropMonitoringSystem/api/vi/corpse/save", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Check if the response body has content
            return response.text().then(text => (text ? JSON.parse(text) : {}));
        })
        .then(data => {
            console.log("Crop added successfully:", data);
            alert("Crop added successfully!");
            //reset();
            tableAppend();
        })
        .catch(error => {
            console.error("Error adding crop:", error);
            alert("Failed to add crop. Please try again.");
        });
});
function tableAppend() {
    const category = document.getElementById('category_C');
    const commonName = document.getElementById('cropName_C');
    const cropImage = document.getElementById('inputGroupFile01')?.files[0] || null; // Get the file object
    const cropScientific = document.getElementById('cropScientific_C');
    const cropSeason = document.getElementById('cropSeason_C');
    const id = document.getElementById('lbl4');
    const token = localStorage.getItem('token'); // Get the token from localStorage

    // Send a GET request to fetch the crop data
    fetch("http://localhost:5050/backendCropMonitoringSystem/api/vi/corpse",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
        
    )
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.querySelector("#cropTable tbody");

            // Clear existing rows in the table
            tableBody.innerHTML = "";

            // Append new rows based on the fetched data
            data.forEach(crop => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td class="clickablecrops">${crop.corpseID || "N/A"}</td>
                    <td class="clickablecrops">${crop.common_name || "N/A"}</td>
                    <td class="clickablecrops">${crop.crop_scientific_name || "N/A"}</td>
                    <td class="clickablecrops">${crop.category || "N/A"}</td>
                    <td class="clickablecrops">${crop.crop_season || "N/A"}</td>
                `;
                row.querySelector(".clickablecrops").addEventListener("click", function () {
                    id.textContent = crop.corpseID;  // Update the label with the clicked fieldID
                    category.value = crop.common_name;       // Set value in input
                    cropScientific.value =crop.crop_scientific_name ;    // Set value in input
                    cropSeason.value =crop.crop_season ;       // Set value in input
                    commonName.value = crop.common_name;          // Set value in input

                });

                tableBody.appendChild(row);
            });

            // Optionally, save the data in local storage
            // localStorage.setItem("", JSON.stringify(data));
        })
        // .catch(error => {
        //     alert("Failed to fetch crop data. Please try again.");
        // });
}
tableAppend();

document.getElementById('inputGroupFile01')?.addEventListener('change', function(event) {
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
function reset(){
    document.getElementById('category_C').value = '';
    document.getElementById('cropName_C').value = '';
    document.getElementById('inputGroupFile01').value = '';
    document.getElementById('cropScientific_C').value = '';
    document.getElementById('cropSeason_C').value = '';
    document.getElementById('lbl4').textContent =" ";
}
document.getElementById("updateBtn_C").addEventListener('click', function () {
    const category = document.getElementById('category_C').value;
    const commonName = document.getElementById('cropName_C').value;
    const cropScientific = document.getElementById('cropScientific_C').value;
    const cropSeason = document.getElementById('cropSeason_C').value;
    const id = document.getElementById('lbl4').textContent;
    const token = localStorage.getItem('token'); // Get the token from localStorage
    // Create JSON payload
    const payload = {
        common_name: commonName,
        crop_scientific_name: cropScientific,
        category: category,
        crop_season: cropSeason,
    };

    // Send the PUT request using jQuery's $.ajax
    $.ajax({
        url: `http://localhost:5050/backendCropMonitoringSystem/api/vi/corpse/${encodeURIComponent(id)}`,
        type: "PUT",
        contentType: "application/json", // Indicate JSON payload
        data: JSON.stringify(payload), // Convert the payload to JSON string
        headers: {
            Authorization: `Bearer ${token}`,
        },
        success: function (data) {
            console.log("Crop updated successfully:", data);
            alert("Crop updated successfully!");
            // Optionally, reset or refresh the UI
            // reset();
            tableAppend();
        },
        error: function (xhr, status, error) {
            console.error("Error updating crop:", error);
            alert("Failed to update crop. Please try again.");
        },
    });
});
document.getElementById('deleteBtn_C').addEventListener('click',function (){
    const  id =document.getElementById("lbl4").textContent;
    const token = localStorage.getItem('token'); // Get the token from localStorage
    $.ajax({
        url: `http://localhost:5050/backendCropMonitoringSystem/api/vi/corpse/${encodeURIComponent(id)}`,
        type: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        contentType: "application/json", // Indicate JSON payload
        success: function (data) {
            console.log("Crop removed", data);
            alert("Crop removed successfully!");

            tableAppend();
        },
        error: function (xhr, status, error) {
            console.error("Error removing crop:", error);
            alert("Failed to remove crop. Please try again.");
        },
    });

})

document.getElementById('resetBtn_C').addEventListener('click',function (){
    reset();
})


function check() {
    let check = document.getElementById("accountname") ? document.getElementById("accountname").textContent : '';
    if (check.trim() === "USER") { // Use trim to remove any leading/trailing spaces
        let addBtnV = document.getElementById("addBtn_C");
        let resetBtnV = document.getElementById("resetBtn_C");
        let deleteBtnVvv = document.getElementById("deleteBtn_C");
        let updateBtnV = document.getElementById("updateBtn_C");

        if (addBtnV) addBtnV.style.display = "none";  // Hide the add button if it exists
        if (resetBtnV) resetBtnV.style.display = "none";  // Hide the reset button if it exists
        if (deleteBtnVvv) deleteBtnVvv.style.display = "none";  // Hide the delete button if it exists
        if (updateBtnV) updateBtnV.style.display = "none";  // Hide the update button if it exists
    }
}

check();