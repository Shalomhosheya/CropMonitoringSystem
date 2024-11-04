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
resettext();
document.getElementById('addBTN').addEventListener('click', function () {
    console.log("click");
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
            resettext();
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
document.getElementById('updateBtn').addEventListener('click', function () {
    console.log("updateBtn clicked");

    // Get field values
    var fieldName = document.getElementById('fieldName').value;
    var fieldloc = document.getElementById('fieldLocation').value;
    var fieldsize = document.getElementById('sizefield').value;
    var fieldstaff = document.getElementById('staff').value;
    var fieldPic1 = document.getElementById('inputGroupFile02').files[0];
    var fieldPic2 = document.getElementById('inputGroupFile03').files[0];
    var label = document.getElementById('lbl1').textContent;

    console.log(fieldloc, fieldsize, fieldstaff);
    // Create FormData object to handle files and add non-empty fields
/*
    var formData = new FormData();
    if (fieldName) formData.append("fieldName", fieldName);
    if (fieldloc) formData.append("fieldloc", fieldloc);
    if (fieldsize) formData.append("fieldsize", fieldsize);
    if (fieldstaff) formData.append("fieldstaff", fieldstaff);
    if (fieldPic1) formData.append("fieldPic1", fieldPic1);
    if (fieldPic2) formData.append("fieldPic2", fieldPic2);
*/

    // Send AJAX request with FormData
    var data = {
        fieldName: fieldName,
        fieldloc: fieldloc,
        fieldsize: fieldsize,
        fieldstaff: fieldstaff,
        // fieldPic1:fieldPic1,
        // fieldPic2:fieldPic2
    };

    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/field/" + encodeURIComponent(label),
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            console.log('Success:', response);
            alert("Update successful");
            fetchAndDisplayFields();
        },
        error: function (xhr, status, error) {
            console.error('AJAX error:', status, error);
            alert("Update failed");
        }
    });

});

document.getElementById('deleteBtn').addEventListener('click', function () {
    console.log("Delete button clicked");  // Check if this log appears in the console

    var fieldID = document.getElementById("lbl1").textContent.trim();
    if (!fieldID) {
        alert("Please select a field to delete.");
        return;
    }

    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/field/" + encodeURIComponent(fieldID),
        type: "DELETE",
        contentType: 'application/json',
        success: function (response) {
            console.log("Field Successfully Deleted", response);
            alert("Field Successfully Deleted");
            fetchAndDisplayFields();
            resettext()
        },
        error: function (xhr, status, error) {
            console.log("Error deleting field:", xhr, status, error);
            alert("Field deletion failed");
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
function resettext() {
    document.getElementById('fieldName').value = "";
    document.getElementById('fieldLocation').value = "";
    document.getElementById('sizefield').value = "";
    document.getElementById('staff').value = "";
    document.getElementById('inputGroupFile02').value = ""; // Clear file input
    document.getElementById('inputGroupFile03').value = ""; // Clear file input
    document.getElementById('lbl1').textContent = ""; // Clear label

    // Clear image previews
    document.getElementById('previewImage1').src = "";
    document.getElementById('previewImage2').src = "";

    // Log to confirm reset action
    console.log("Form fields have been reset.");
}

document.getElementById('resetBTN').addEventListener('click', function () {
   resettext() // Get the elements directly and set their values to empty strings
});

// Call this function initially to load existing data on page load
fetchAndDisplayFields();




