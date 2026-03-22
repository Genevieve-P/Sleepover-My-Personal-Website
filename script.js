console.log("[script.js] loaded");

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggleButton = document.getElementById("bgToggle");
    const navbar = document.getElementById("navbar");
    const toggleNavButton = document.getElementById("toggleNav");

    body.classList.add("bg-one");

    if (toggleButton) {
        toggleButton.addEventListener("click", (e) => {
            e.stopPropagation();
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
        if (href === currentPage) {
            link.classList.add("active");
        }
    });

    if (toggleNavButton && navbar) {
        toggleNavButton.addEventListener("click", (e) => {
            e.stopPropagation();
            navbar.classList.toggle("nav-hidden");
            toggleNavButton.style.transform = navbar.classList.contains("nav-hidden") ? "rotate(180deg)" : "rotate(0deg)";
        });
    } else {
        if (!toggleNavButton) console.warn('toggleNav button not found');
        if (!navbar) console.warn('navbar element not found');
    }
});
const cats=[
    {name:"Whiskers",breed:"Tabby", age:3},
    {name:"Mittens", breed:"Siamese", age:2},
    {name:"Mochi", breed:"Maine Coon", age:4},
    {name:"Luna", breed:"Bengal", age:1},
    {name:"Gum Gum", breed: "GummiBare", age:4}
];

async function getCat() {
    const container = document.getElementById("catContainer");
    container.innerHTML = "<p>Loading cat...</p>";
    
    try {
        // Fetch a random cat image from the API
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await response.json();
        const catImage = data[0];
        
        // Get a random local cat data
        const randomCat = cats[Math.floor(Math.random() * cats.length)];
        
        // Display the cat
        container.innerHTML = `
            <div class="cat-card">
                <img src="${catImage.url}" alt="A cute cat" class="cat-image">
                <div class="cat-info">
                    <h2>${randomCat.name}</h2>
                    <p><strong>Breed:</strong> ${randomCat.breed}</p>
                    <p><strong>Age:</strong> ${randomCat.age} years old</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching cat:', error);
        container.innerHTML = "<p>Sorry, couldn't fetch a cat right now!</p>";
    }
}
