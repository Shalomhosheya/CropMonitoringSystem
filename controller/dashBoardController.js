const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// Initially set the hamburger icon's position
let isOpen = false;

// Retrieve the user role from localStorage
var userRole = localStorage.getItem('userRole');
console.log(userRole);

// Get the <h2> element by its ID
let userRoleText = document.getElementById('accountname');

// Check if the user role exists and the element is found
if (userRole && userRoleText) {
    // Set the inner text of the <h2> element to display the user role
    userRoleText.textContent = ` ${userRole}`;
} else if (!userRole) {
    console.warn('User role not found in localStorage.');
    userRoleText.textContent = "Role: Unknown"; // Optionally set a default message
} else {
    console.error('Element with ID "accountname" not found.');
}

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
    const token = localStorage.getItem('token'); // Get the token from localStorage

    // Function to fetch staff data and update the member count
    function updateStaffCount() {
        fetch("http://localhost:5050/backendCropMonitoringSystem/api/v1/staff", {
            method: "GET", // HTTP method
            headers: {
                "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
                "Content-Type": "application/json", // Optional: Specify content type
            }
        })
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
    const token = localStorage.getItem('token'); // Get the token from localStorage

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
               localStorage.setItem("availableReservations", reservationCount)

            // Log the count to verify
            console.log(`Available reservation count: ${reservationCount}`);

            // Select the element where the count will be displayed
            const res = document.getElementById("reservation1");

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
    // Define the Bearer token
    const token = localStorage.getItem('token'); // Get the token from localStorage

    // Function to fetch crop data
    function fetchCrops() {
        const apiEndpoint = "http://localhost:5050/backendCropMonitoringSystem/api/vi/corpse";
        const label = document.getElementById('crops');

        if (!label) {
            console.warn("Element with ID 'crops' not found. Please ensure the HTML is correct.");
            return;
        }

        fetch(apiEndpoint, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error("Unexpected response format: Expected an array of crops.");
                }
                label.textContent = data.length;
            })
            .catch(error => {
                console.error("Failed to fetch crop data:", error);
                alert("Failed to load crop data. Please try again.");
            });
    }

    // Function to fetch equipment data
    function fetchEquipment() {
        const apiEndpoint = "http://localhost:5050/backendCropMonitoringSystem/api/v1/equipment";
        const labelEq = document.getElementById('equip');

        if (!labelEq) {
            console.warn("Element with ID 'equip' not found. Please ensure the HTML is correct.");
            return;
        }

        fetch(apiEndpoint, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error("Unexpected response format: Expected an array of equipment.");
                }
                labelEq.textContent = data.length;
            })
            .catch(error => {
                console.error("Failed to fetch equipment data:", error);
                alert("Failed to load equipment data. Please try again.");
            });
    }

    // Function to fetch vehicle data
    function fetchVehicles() {
        const apiEndpoint = "http://localhost:5050/backendCropMonitoringSystem/api/v1/vehicle";
        const labelVehicle = document.getElementById('vehicle');

        if (!labelVehicle) {
            console.warn("Element with ID 'vehicle' not found. Please ensure the HTML is correct.");
            return;
        }

        fetch(apiEndpoint, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error("Unexpected response format: Expected an array of vehicles.");
                }
                labelVehicle.textContent = data.length;
            })
            .catch(error => {
                console.error("Failed to fetch vehicle data:", error);
                alert("Failed to load vehicle data. Please try again.");
            });
    }

    // Fetch data for crops, equipment, and vehicles
    fetchCrops();
    fetchEquipment();
    fetchVehicles();
});
document.addEventListener("DOMContentLoaded", function () {
    // Define the canvas context
    const pieChartCtx = document.getElementById('overviewPieChart').getContext('2d');

    const token = localStorage.getItem('token'); 
    const reservation = localStorage.getItem('availableReservations'); 

    // Function to fetch data and render the pie chart
    const fetchDataAndRenderPieChart = async () => {
        try {
            if (!token) {
                throw new Error("Token not found. Please log in.");
            }

            // Fetch data from your API endpoints with headers
            const [staff,crops, equipment, vehicles] = await Promise.all([
                fetch("http://localhost:5050/backendCropMonitoringSystem/api/v1/staff", {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(res => res.json()),
                fetch("http://localhost:5050/backendCropMonitoringSystem/api/vi/corpse", {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(res => res.json()),
                fetch("http://localhost:5050/backendCropMonitoringSystem/api/v1/equipment", {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(res => res.json()),
                fetch("http://localhost:5050/backendCropMonitoringSystem/api/v1/vehicle", {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(res => res.json()),
            ]);

            // Update numbers in the DOM
            document.getElementById('member').textContent = staff.length;
            // document.getElementById('reservation1').textContent = reservation;
            document.getElementById('crops').textContent = crops.length;
            document.getElementById('equip').textContent = equipment.length;
            document.getElementById('vehicle').textContent = vehicles.length;

            // Prepare data for the pie chart
            const chartData = {
                labels: ['Total Staff', 'Active Reservation', 'Total Crops', 'Equipment', 'Vehicles'],
                datasets: [{
                    data: [staff.length,reservation, crops.length,equipment.length, vehicles.length],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)', // Red
                        'rgba(54, 162, 235, 0.6)', // Blue
                        'rgba(255, 206, 86, 0.6)', // Yellow
                        'rgba(75, 192, 192, 0.6)', // Green
                        'rgba(153, 102, 255, 0.6)'  // Purple
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            };

            // Create the pie chart
            new Chart(pieChartCtx, {
                type: 'pie',
                data: chartData,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Overview of Dashboard Data'
                        }
                    }
                }
            });

        } catch (error) {
            console.error("Error fetching data or rendering pie chart:", error);
            alert("An error occurred: " + error.message);
        }
    };

    fetchDataAndRenderPieChart();
});



/*
const pieChartCanvas = document.getElementById('overviewPieChart');
const pieChartCtx = pieChartCanvas.getContext('2d'); // Get the 2D context

new Chart(pieChartCtx, {
    type: 'pie',
    data: chartData,
    options: {
        responsive: false, // Turn off responsiveness for precise control
        maintainAspectRatio: true,
    }
});*/

// Set canvas size programmatically if needed
const canvas = document.getElementById('overviewPieChart');
canvas.width = 250;
canvas.height = 250;
