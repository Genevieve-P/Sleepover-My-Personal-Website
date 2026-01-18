const toggleButton = document.getElementById("bgToggle");
const body = document.body;

if(toggleButton) {
    toggleButton.addEventListener("click", () => {
        body.classList.toggle("bg-one");
        body.classList.toggle("bg-two");
    });
} else {
    console.warn('bgToggle button not found');
}

const links = document.querySelectorAll(".nav-links a");
const currentPage = window.location.pathname.split("/").pop() || "index1.html";

console.log("Current page:", currentPage);

links.forEach(link => {
    const href = link.getAttribute("href");
    console.log("Checking link:", href);
    if(href === currentPage) {
        console.log("Match found, adding active class to:", href);
        link.classList.add("active");
    }
});
