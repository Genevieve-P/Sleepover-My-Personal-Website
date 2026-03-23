console.log("[script.js] loaded");

document.addEventListener("DOMContentLoaded", () => {
    // Custom cursor implementation
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    const toggleButton = document.getElementById("bgToggle");
    const navbar = document.getElementById("navbar");
    const toggleNavButton = document.getElementById("toggleNav");

    const html = document.documentElement;
    if (!html.classList.contains("bg-one") && !html.classList.contains("bg-two")) {
        html.classList.add(localStorage.getItem("backgroundStyle") || "bg-one");
    }

    if (toggleButton) {
        toggleButton.addEventListener("click", (e) => {
            e.stopPropagation();
            const html = document.documentElement;
            html.classList.toggle("bg-one");
            html.classList.toggle("bg-two");
            const isNowBgOne = html.classList.contains("bg-one");
            localStorage.setItem("backgroundStyle", isNowBgOne ? "bg-one" : "bg-two");
        });
    } else {
        console.warn('bgToggle button not found');
    }

    const links = document.querySelectorAll(".nav-links a");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const normalizedPage = currentPage === "index.html" ? "index.html" : currentPage;
    links.forEach(link => {
        const href = link.getAttribute("href");
        const normalizedHref = href === "index.html" ? "index.html" : href;
        if (normalizedHref === normalizedPage) {
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

const cats = [
    { name: "Whiskers", breed: "Tabby",      age: 3 },
    { name: "Mittens",  breed: "Siamese",    age: 2 },
    { name: "Mochi",    breed: "Maine Coon", age: 4 },
    { name: "Luna",     breed: "Bengal",     age: 1 },
    { name: "Gum Gum",  breed: "GummiBare",  age: 4 }
];

async function getCat() {
    const container = document.getElementById("catContainer");
    container.innerHTML = "<p>Loading cat...</p>";
    try {
        const response  = await fetch('https://api.thecatapi.com/v1/images/search');
        const data      = await response.json();
        const catImage  = data[0];
        const randomCat = cats[Math.floor(Math.random() * cats.length)];
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

(function () {
    const MAX_BEARS = 18;
    const pool = [];

    for (let i = 0; i < MAX_BEARS; i++) {
        const el = document.createElement('img');
        el.src = 'gummybear.png';
        el.width = 36;
        el.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 99999;
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
            transition: opacity 0.1s;
            filter: drop-shadow(0 0 6px rgba(0,196,167,0.6));
        `;
        document.body.appendChild(el);
        pool.push({ el, timer: null });
    }

    let poolIndex = 0;
    let lastX = -999, lastY = -999;

    function spawnBear(x, y) {
        const bear = pool[poolIndex % MAX_BEARS];
        poolIndex++;
        if (bear.timer) clearTimeout(bear.timer);

        const offsetX = (Math.random() - 0.5) * 16;
        const offsetY = (Math.random() - 0.5) * 16;
        const rot     = (Math.random() - 0.5) * 40;
        const scale   = 0.6 + Math.random() * 0.6;

        bear.el.style.transition = 'opacity 0.1s';
        bear.el.style.left       = (x + offsetX) + 'px';
        bear.el.style.top        = (y + offsetY) + 'px';
        bear.el.style.transform  = `translate(-50%, -50%) scale(${scale}) rotate(${rot}deg)`;
        bear.el.style.opacity    = '1';

        bear.timer = setTimeout(() => {
            bear.el.style.transition = 'opacity 0.5s, transform 0.5s';
            bear.el.style.opacity    = '0';
            bear.el.style.transform  = `translate(-50%, -100%) scale(${scale * 0.7}) rotate(${rot}deg)`;
            bear.timer = null;
        }, 300);
    }

    document.addEventListener('mousemove', (e) => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        if (dx * dx + dy * dy > 300) {
            spawnBear(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
})();