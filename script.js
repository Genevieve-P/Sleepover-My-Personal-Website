const toggleButton = document.getElementById("bgToggle");
const body = document.body;

const savedBackground = localStorage.getItem("backgroundStyle") || "bg-one";
body.classList.add(savedBackground);

if(toggleButton) {
    toggleButton.addEventListener("click", () => {
        body.classList.toggle("bg-one");
        body.classList.toggle("bg-two");
        
        const isNowBgOne = body.classList.contains("bg-one");
        localStorage.setItem("backgroundStyle", isNowBgOne ? "bg-one" : "bg-two");
    });
} else {
    console.warn('bgToggle button not found');
}

const links = document.querySelectorAll(".nav-links a");
const currentPage = window.location.pathname.split("/").pop() || "index1.html";

links.forEach(link => {
    const href = link.getAttribute("href");
    if(href === currentPage) {
        link.classList.add("active");
    }
});
