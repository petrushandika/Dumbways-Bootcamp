let isOpen = false;

function openHamburger() {
    let hamburgerNavContainer = document.getElementById("hamburger");

    if (!isOpen) {
        hamburgerNavContainer.style.display = "flex";
    } else {
        hamburgerNavContainer.style.display = "none";
    }
    
    isOpen = !isOpen;
}
