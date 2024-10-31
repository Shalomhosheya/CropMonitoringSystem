// Function to display the selected image preview
function showPreview(event, previewId) {
    const reader = new FileReader();
    reader.onload = function () {
        const previewImage = document.getElementById(previewId);
        previewImage.src = reader.result; // Set image preview src to uploaded image
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Event listeners for the file inputs
document.getElementById('inputGroupFile02').addEventListener('change', function(event) {
    showPreview(event, 'previewImage1');
});

document.getElementById('inputGroupFile03').addEventListener('change', function(event) {
    showPreview(event, 'previewImage2');
});

document.getElementById('addBTN').addEventListener('click', function () {
    var fieldName = document.getElementById('fieldName').value;
    var fieldloc = document.getElementById('fieldLocation').value;
    var fieldsize = document.getElementById('sizefield').value;
    var fieldstaff = document.getElementById('staff').value;
    var fieldPic1 = document.getElementById('inputGroupFile02').files[0];
    var fieldPic2 = document.getElementById('inputGroupFile03').files[0];

    var formData = new FormData();
    formData.append('fieldName', fieldName);
    formData.append('fieldloc', fieldloc);
    formData.append('fieldsize', fieldsize);
    formData.append('fieldstaff', fieldstaff);
    formData.append('fieldPic1', fieldPic1);
    formData.append('fieldPic2', fieldPic2);

    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/field/save",
        type: "POST",
        data: formData,
        contentType: false, // Required for FormData
        processData: false, // Required for FormData
        success: function () {
            console.log("Field Successfully created");
            alert("Fields Successfully created");

            // Call function to load and display the updated list of fields
            fetchAndDisplayFields();
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert("Field creation failed");
        }
    });
});

// Function to fetch and display fields in the table
function fetchAndDisplayFields() {
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/field",
        type: "GET",
        success: function (response) {
            const tableBody = document.querySelector("#fieldsTable tbody");
            tableBody.innerHTML = ""; // Clear existing rows

            // Append each field data to the table
            response.forEach((field, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <th scope="row">${field.fieldName}</th>
                    <td>${field.fieldLocation}</td>
                    <td>${field.fieldSize}</td>
                    <td>${field.staff}</td>
                `;
                tableBody.appendChild(row);
            });
        },
        error: function (xhr, status, error) {
            console.log("Failed to fetch fields:", xhr, status, error);
        }
    });
}

// Call this function initially to load existing data on page load
fetchAndDisplayFields();

