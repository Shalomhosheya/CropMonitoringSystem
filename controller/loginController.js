

// document.getElementById("signInBTN").addEventListener('click',function (){
//     alert("done");
//     event.preventDefault()
//     window.location.href="../pages/dashBoard.html"//only the html opens not the styles

// })

document.addEventListener('DOMContentLoaded', function () {
    const array = ["MANAGER", "ADMINISTRATIVE", "SCIENTIST", "USER"];
    const selectElement = document.getElementById('roleselect');

    if (selectElement) {
        // Dynamically create and append options
        array.forEach(role => {
            const option = document.createElement('option');
            option.value = role.toLowerCase(); // Use lowercase as the value
            option.textContent = role; // Use the role name as the display text
            selectElement.appendChild(option);
        });
    } else {
        console.error("Select element with ID 'roleselect' not found.");
    }
});
 

document.getElementById('signUPBtn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    var firstname = document.getElementById('usernameText').value;
    var lastname = document.getElementById('lastname').value;
    var role = document.getElementById('roleselect').value;
    var email = document.getElementById('emailText').value;
    var password = document.getElementById('passwordtext').value;

    const token = localStorage.getItem('token');
     // Create FormData object
    const formData = new FormData();
    formData.append('firstName', firstname);
    formData.append('lastName', lastname);
    formData.append('role', role.toUpperCase());
    formData.append('email', email);
    formData.append('password', password);

    // AJAX request
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/auth/signup",
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: formData,
        processData: false, // Prevent jQuery from automatically processing the data
        contentType: false, // Prevent jQuery from setting Content-Type header
        success: function (response) {
            console.log('Account created successfully:', response);
            alert('Account created successfully');
            localStorage.setItem('token', token); // Save token
        },
        error: function (xhr, status, error) {
            console.error('Error creating Account:', error);
            alert('Error creating Account');
        }
    });
});
document.getElementById('signInBTN').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('emailText2').value;
    const password = document.getElementById('passwordtext2').value;

    console.log(email, password);

    // Sign-In Request
    $.ajax({
        url: "http://localhost:5050/backendCropMonitoringSystem/api/v1/auth/signin",
        method: 'POST',
        contentType: 'application/json', // Set content type to JSON
        data: JSON.stringify({
            email: email,
            password: password
        }), // Send email and password as JSON
        success: function (response) {
            console.log('Logged in successfully:', response);
            alert('Logged in successfully');
           
            if (response.email) {
                console.log('User email:', response.email);
                fetchUserDetails(response.email); // Send email from the sign-in response
            } else {
                console.warn('Email not found in response:', response);
            }
            // Redirect to dashboard
            event.preventDefault();
           
            // Save the new token in localStorage
            localStorage.setItem('token', response.token);
            
            // Fetch User Details using the new token and email
            fetchUserDetails(response.email); // Send email from the sign-in response
        },
        error: function (xhr, status, error) {
            console.error('Error logging in:', xhr.responseText || error);
            alert('Login failed. Please check your credentials and try again.');
        }
    });
});

// Function to fetch user details and filter based on email
function fetchUserDetails(email) {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
        console.error('No token found in localStorage');
        alert('Please log in to continue.');
        return;
    }

    fetch("http://localhost:5050/backendCropMonitoringSystem/api/v1/users", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            // Handle non-successful HTTP statuses
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON from the response
    })
    .then(data => {
        console.log('User details fetched:', data);

        // Filter the user by email
        const user = data.find(user => user.email === email);

        if (user) {
            console.log(`User role for ${email}: ${user.role}`);
            // Save user role in localStorage
            localStorage.setItem('userRole', user.role);
            alert(`Welcome ${user.firstName}! Your role is: ${user.role}`);
            window.location.href = "../pages/dashBoard.html"; // Only the HTML opens, not the styles

        } else {
            console.warn('No user found with the provided email.');
            alert('Failed to identify the user role.');
        }
    })
    .catch(error => {
        console.error('Error fetching user details:', error.message);
        alert('Failed to fetch user details. Please try again later.');
    });
}
