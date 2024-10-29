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
})