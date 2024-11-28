const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// Initially set the hamburger icon's position
let isOpen = false;

hamburger.addEventListener('click', () => {
    // Toggle sidebar open/close
    sidebar.classList.toggle('open');

    // Change the position of the hamburger icon with a delay for closing
    if (isOpen) {
        // Delay moving back to the original position by 0.5 seconds
        setTimeout(() => {
            hamburger.style.left = '20px'; // Move back to original position
        }, 200); // 500 milliseconds delay
    } else {
        setTimeout(() => {
            hamburger.style.left = '205px'; // Move back to original position
        }, 150);
    }

    // Toggle the open state
    isOpen = !isOpen;
});
document.getElementById('logoutBtn').addEventListener('click',function (){
    window.location.href="../index.html"
});
document.getElementById("member");//add get request of staff and count the member and add to the member text content//
//http://localhost:5050/backendCropMonitoringSystem/api/v1/staff

document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch staff data and update the member count
    function updateStaffCount() {
        fetch("http://localhost:5050/backendCropMonitoringSystem/api/v1/staff")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Assume `data` is an array of staff objects
                const staffCount = data.length;

                // Update the text content of the member element
                document.getElementById("member").textContent = staffCount;
            })
            .catch(error => {
                console.error("Error fetching staff data:", error);
                document.getElementById("member").textContent = "Error fetching data";
            });
    }

    // Call the function to update the staff count
    updateStaffCount();
});
document.addEventListener('DOMContentLoaded', function () {
    // The Bearer token string
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVJVU0VSIn1dLCJzdWIiOiJzaGFsb21ob3NoZXlhMzQ1MEBnbWFpbC5jb20iLCJleHAiOjE3MzMxNTQ5NTl9.VfiY-ntr-a-iTvzFbNuLe4CjXKrNSUQ--b1zxCU1QSc";

    // Fetch reservation data from the API
    fetch("http://localhost:5050/backendCropMonitoringSystem/api/v1/reservstion", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // Add the Authorization header
            "Content-Type": "application/json" // Optional, ensures JSON communication
        }
    })
        .then(response => {
            // Check if the response is okay
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            console.log("Reservation data fetched successfully:", data);

            // Ensure data is an array
            if (!Array.isArray(data)) {
                throw new Error("Unexpected response format: Expected an array of reservations.");
            }

            // Filter reservations with status "available"
            const availableReservations = data.filter(reservation => reservation.response === "available");

            // Calculate the count of "available" reservations
            const reservationCount = availableReservations.length;

            // Log the count to verify
            console.log(`Available reservation count: ${reservationCount}`);

            // Select the element where the count will be displayed
            const res = document.getElementById("reservation");

            if (res) {
                // Update the count in the element
                res.textContent = reservationCount;
                console.log("Available reservation count updated in the DOM.");
            } else {
                console.warn("Reservation count element not found. Ensure the HTML structure is correct.");
            }
        })
        .catch(error => {
            console.error("Failed to fetch reservation data:", error);
            alert("Failed to load reservation data. Please try again.");
        });
});
document.addEventListener('DOMContentLoaded', function () {
    // Define the API endpoint
    const apiEndpoint = "http://localhost:5050/backendCropMonitoringSystem/api/vi/corpse";
    const label = document.getElementById('crops'); // Get the label element

    if (!label) {
        console.warn("Element with ID 'crops' not found. Please ensure the HTML is correct.");
        return;
    }

    // Fetch crop data
    fetch(apiEndpoint, {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            console.log("Crop data fetched successfully:", data);

            // Ensure the response is an array
            if (!Array.isArray(data)) {
                throw new Error("Unexpected response format: Expected an array of crops.");
            }

            // Count the number of crops
            const cropCount = data.length;

            // Update the label with the crop count
            label.textContent = cropCount;
            console.log(`Crop count updated to ${cropCount} in the DOM.`);
        })
        .catch(error => {
            console.error("Failed to fetch crop data:", error);
            alert("Failed to load crop data. Please try again.");
        });
});
document.addEventListener('DOMContentLoaded', function () {
    // Define the API endpoint
    const apiEndpoint = "http://localhost:5050/backendCropMonitoringSystem/api/v1/equipment";
    const labelEq = document.getElementById('equip'); // Get the label element

    if (!labelEq) {
        console.warn("Element with ID 'equip' not found. Please ensure the HTML is correct.");
        return;
    }

    // Fetch equipment data
    fetch(apiEndpoint, {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            console.log("Equipment data fetched successfully:", data);

            // Ensure the response is an array
            if (!Array.isArray(data)) {
                throw new Error("Unexpected response format: Expected an array of equipment.");
            }

            // Count the number of equipment
            const equipmentCount = data.length;

            // Update the label with the equipment count
            labelEq.textContent = equipmentCount;
            console.log(`Equipment count updated to ${equipmentCount} in the DOM.`);
        })
        .catch(error => {
            console.error("Failed to fetch equipment data:", error);
            alert("Failed to load equipment data. Please try again.");
        });
});
document.addEventListener('DOMContentLoaded', function () {
    // Define the API endpoint for vehicles
    const apiEndpoint = "http://localhost:5050/backendCropMonitoringSystem/api/v1/vehicle";
    const labelVehicle = document.getElementById('vehicle'); // Get the label element for vehicle count

    if (!labelVehicle) {
        console.warn("Element with ID 'vehicle' not found. Please ensure the HTML is correct.");
        return;
    }

    // Fetch vehicle data
    fetch(apiEndpoint, {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            console.log("Vehicle data fetched successfully:", data);

            // Ensure the response is an array
            if (!Array.isArray(data)) {
                throw new Error("Unexpected response format: Expected an array of vehicles.");
            }

            // Count the number of vehicles
            const vehicleCount = data.length;

            // Update the label with the vehicle count
            labelVehicle.textContent = vehicleCount;
            console.log(`Vehicle count updated to ${vehicleCount} in the DOM.`);
        })
        .catch(error => {
            console.error("Failed to fetch vehicle data:", error);
            alert("Failed to load vehicle data. Please try again.");
        });
});
