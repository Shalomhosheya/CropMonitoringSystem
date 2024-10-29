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