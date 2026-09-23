function searchProducts() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {
        const productName = product.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(searchText)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    }); 
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addCartButtons = document.querySelectorAll(".product-card button");

addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productCard = button.closest(".product-card");

        const productName = productCard.querySelector("h3").textContent;
        const productPrice = productCard.querySelector(".price").textContent;
        const productImage = productCard.querySelector("img").src;

        const product = {
            name: productName,
            price: productPrice,
            image: productImage
        };

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert(productName + " has been added to your cart!");

    });

});

// DISPLAY CART PRODUCTS

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function displayCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    // Group identical products
    const groupedCart = [];

    cart.forEach(function(product) {

        const existingProduct = groupedCart.find(function(item) {
            return item.name === product.name;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            groupedCart.push({
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

    });

    groupedCart.forEach(function(product) {

        const item = document.createElement("div");

        item.classList.add("cart-item");

        const priceNumber = parseInt(
            product.price.replace(/[^0-9]/g, "")
        );

        const productTotal = priceNumber * product.quantity;

        total += productTotal;

        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <div class="cart-product-info">
                <h3>${product.name}</h3>

                <p>${product.price}</p>

                <div class="quantity-controls">

                    <button class="minus-btn">−</button>

                    <span>${product.quantity}</span>

                    <button class="plus-btn">+</button>

                </div>

                <button class="remove-btn">Remove</button>

            </div>
        `;

        // PLUS BUTTON
        item.querySelector(".plus-btn").addEventListener("click", function() {

            cart.push({
                name: product.name,
                price: product.price,
                image: product.image
            });

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();
        });


        // MINUS BUTTON
        item.querySelector(".minus-btn").addEventListener("click", function() {

            const index = cart.findIndex(function(item) {
                return item.name === product.name;
            });

            if (index !== -1) {
                cart.splice(index, 1);
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();
        });


        // REMOVE BUTTON
        item.querySelector(".remove-btn").addEventListener("click", function() {

            cart = cart.filter(function(item) {
                return item.name !== product.name;
            });

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();
        });


        cartItems.appendChild(item);

    });

    cartTotal.textContent = "Total: ₦" + total.toLocaleString();
}

displayCart();

// CART ITEM COUNT

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// CATEGORY FILTER

const categoryLinks = document.querySelectorAll(".category-link");
const products = document.querySelectorAll(".product-card");

categoryLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const category = link.dataset.category;

        products.forEach(function(product) {

            if (category === "all" || product.classList.contains(category)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }

        });

    });

});

// SAVE ACCOUNT DETAILS

const accountButton = document.querySelector(".account-box button");

if (accountButton) {

    accountButton.addEventListener("click", function() {

        const name = document.querySelector('.account-box input[type="text"]').value;
        const email = document.querySelector('.account-box input[type="email"]').value;

        localStorage.setItem("accountName", name);
        localStorage.setItem("accountEmail", email);

        alert("Account details saved successfully! 🎉");

    });

}

// PRODUCT DETAILS TEST

const productName = document.querySelector(".product-name");

if (productName) {
    productName.addEventListener("click", function() {
        alert("You selected: Beautiful Dress");
    });
}

<button id="checkout-btn" onclick="goToCheckout()">CHECKOUT</button>
