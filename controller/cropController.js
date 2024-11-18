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
    // Send a GET request to fetch the crop data
    fetch("http://localhost:5050/backendCropMonitoringSystem/api/vi/corpse")
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
                    <td>${crop.corpseID || "N/A"}</td>
                    <td>${crop.common_name || "N/A"}</td>
                    <td>${crop.crop_scientific_name || "N/A"}</td>
                    <td>${crop.category || "N/A"}</td>
                    <td>${crop.crop_season || "N/A"}</td>
                `;

                tableBody.appendChild(row);
            });

            // Optionally, save the data in local storage
            localStorage.setItem("cropsData", JSON.stringify(data));
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
    document.getElementById('lbl3').textContent ="";
}