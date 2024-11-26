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
/*
document.getElementById("member");//add get request of staff and count the member and add to the member text content//
//http://localhost:5050/backendCropMonitoringSystem/api/v1/staff
*/

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
    // Fetch reservation data from the API
    fetch("http://localhost:5050/backendCropMonitoringSystem/api/v1/reservstion", {
        method: "GET",
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
            const reservationCountElement = document.querySelector(".overview-box p");
            const res = document.getElementById("reservation");

            if (reservationCountElement) {
                // Update the count in the element
                res.textContent = reservationCount;
                console.log("Available reservation count updated in the DOM.");
            } else {
                console.warn("Count element not found. Ensure the HTML structure is correct.");
            }
        })
        .catch(error => {
            console.error("Failed to fetch reservation data:", error);
            alert("Failed to load reservation data. Please try again.");
        });
});

