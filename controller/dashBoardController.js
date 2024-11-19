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
