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
    // Check if data exists in local storage
    const storedFields = JSON.parse(localStorage.getItem("fieldsData"));

    // If local storage has data, use it to populate the table
    if (storedFields) {
        populateTable(storedFields);
    }

    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/field",
        type: "GET",
        success: function (response) {
            // Keep only necessary data
            const essentialData = response.map(field => ({
                fieldID: field.fieldID,
                fieldName: field.fieldName,
                fieldLocation: field.fieldLocation,
                fieldSize: field.fieldSize,
                staff: field.staff
            }));

            // Store in local storage
            try {
                localStorage.setItem("fieldsData", JSON.stringify(essentialData));
            } catch (e) {
                console.error("Failed to store data in local storage:", e);
            }

            populateTable(essentialData);
        }

    });
}

function populateTable(data) {
    // Fetch the input fields
    var fieldName = document.getElementById('fieldName');
    var fieldloc = document.getElementById('fieldLocation');
    var fieldsize = document.getElementById('sizefield');
    var fieldstaff = document.getElementById('staff');
    const fieldLabel = document.getElementById("lbl1");

    const tableBody = document.querySelector("#fieldsTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    // Append each field data to the table
    data.forEach((field, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row" class="clickable-field-id" data-field-id="${field.fieldID}">${field.fieldID}</th>
            <td class="clickable-field-id">${field.fieldName}</td>
            <td class="clickable-field-id">${field.fieldLocation}</td>
            <td class="clickable-field-id">${field.fieldSize}</td>
            <td class="clickable-field-id">${field.staff}</td>
        `;

        // Add click event listener to display details in labels and input fields
        row.querySelector(".clickable-field-id").addEventListener("click", function () {
            fieldLabel.textContent = field.fieldID;  // Update the label with the clicked fieldID
            fieldName.value = field.fieldName;       // Set value in input
            fieldloc.value = field.fieldLocation;    // Set value in input
            fieldsize.value = field.fieldSize;       // Set value in input
            fieldstaff.value = field.staff;          // Set value in input

        });

        tableBody.appendChild(row);
    });
}

// Call this function initially to load existing data on page load
fetchAndDisplayFields();

document.getElementById('delete').addEventListener('click',()=>{
    const fieldID = document.getElementById("lbl1");

    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/field/delete",
        type: "DELETE",
        data: JSON.stringify({
           fieldID:fieldID
        }),
        contentType:'application/json',
        success: function (response) {
            console.log("Field Successfully Deleted "+response);
            alert("Fields Successfully Deleted");

            // Call function to load and display the updated list of fields
            fetchAndDisplayFields();
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert("Field deletion failed");
        }
    });
})


