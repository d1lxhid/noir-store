// PRODUCT DATA

const products = [
    {
        id: 1,
        name: "Minimal Desk Lamp",
        category: "desk",
        price: 2499,
        symbol: "L"
    },
    {
        id: 2,
        name: "Daily Carry Backpack",
        category: "travel",
        price: 3299,
        symbol: "P"
    },
    {
        id: 3,
        name: "Studio Wireless Speaker",
        category: "home",
        price: 1999,
        symbol: "S"
    },
    {
        id: 4,
        name: "Cloud Water Bottle",
        category: "travel",
        price: 899,
        symbol: "B"
    },
    {
        id: 5,
        name: "Field Notebook",
        category: "desk",
        price: 499,
        symbol: "N"
    },
    {
        id: 6,
        name: "Arc Studio Headphones",
        category: "home",
        price: 4599,
        symbol: "H"
    },
    {
        id: 7,
        name: "Mono Wrist Watch",
        category: "travel",
        price: 2799,
        symbol: "W"
    },
    {
        id: 8,
        name: "Soft Ceramic Mug",
        category: "home",
        price: 699,
        symbol: "M"
    }
];


let cart = [];
let activeCategory = "all";


// DOM ELEMENTS

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortProducts = document.getElementById("sortProducts");

const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");


// RENDER PRODUCTS

function renderProducts() {

    const searchTerm = searchInput.value.toLowerCase();

    let filteredProducts = products.filter(product => {

        const matchesCategory =
            activeCategory === "all" ||
            product.category === activeCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;

    });


    const sortValue = sortProducts.value;

    if (sortValue === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }


    productGrid.innerHTML = filteredProducts.map(product => {

        return `
            <article class="product-card">

                <div class="product-image">
                    ${product.symbol}
                </div>

                <h3>${product.name}</h3>

                <p>
                    Thoughtfully designed everyday essential.
                </p>

                <div class="product-bottom">

                    <strong>
                        ₹${product.price.toLocaleString("en-IN")}
                    </strong>

                    <button
                        class="add-button"
                        onclick="addToCart(${product.id})"
                    >
                        +
                    </button>

                </div>

            </article>
        `;

    }).join("");

}


// CART FUNCTIONS

function addToCart(id) {

    const product = products.find(product => product.id === id);

    cart.push(product);

    renderCart();

    openCart();

}


function removeFromCart(index) {

    cart.splice(index, 1);

    renderCart();

}


function renderCart() {

    document.getElementById("cartCount").textContent = cart.length;


    const cartItems = document.getElementById("cartItems");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="color:#999;margin-top:20px;">
                Your bag is empty.
            </p>
        `;

    } else {

        cartItems.innerHTML = cart.map((product, index) => {

            return `
                <div class="cart-item">

                    <span>
                        ${product.name}
                    </span>

                    <strong>
                        ₹${product.price.toLocaleString("en-IN")}

                        <button onclick="removeFromCart(${index})">
                            ×
                        </button>
                    </strong>

                </div>
            `;

        }).join("");

    }


    const total = cart.reduce(
        (sum, product) => sum + product.price,
        0
    );

    document.getElementById("cartTotal").textContent =
        total.toLocaleString("en-IN");

}


// CART OPEN/CLOSE

function openCart() {

    cartPanel.classList.add("open");

    overlay.classList.add("show");

}


function closeCart() {

    cartPanel.classList.remove("open");

    overlay.classList.remove("show");

}


document.getElementById("openCart").addEventListener(
    "click",
    openCart
);

document.getElementById("closeCart").addEventListener(
    "click",
    closeCart
);

overlay.addEventListener("click", closeCart);


// FILTERS

document.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".filter").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        activeCategory = button.dataset.category;

        renderProducts();

    });

});


// SEARCH + SORT

searchInput.addEventListener("input", renderProducts);

sortProducts.addEventListener("change", renderProducts);


// PAGE NAVIGATION

function updatePage() {

    const pageId = location.hash.substring(1) || "home";

    document.querySelectorAll(".page").forEach(page => {

        page.classList.toggle(
            "active",
            page.id === pageId
        );

    });

    document.querySelectorAll("[data-link]").forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + pageId
        );

    });

}


window.addEventListener("hashchange", updatePage);


// CONTACT FORM

document.getElementById("contactForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        document.getElementById("formMessage").textContent =
            "Thanks! Your message has been received in this demo.";

        this.reset();

    }
);


// CHECKOUT

document.getElementById("checkoutButton").addEventListener(
    "click",
    () => {

        alert(
            "This is a demo checkout. Payment integration can be added later."
        );

    }
);


// INITIALIZE

renderProducts();

renderCart();

updatePage();