//add to cart

document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartDisplay = document.querySelector("#cart-display");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            const product = event.target.parentElement;
            const productName = product.querySelector("h4").textContent;
            const productPrice = product.querySelector(".price").textContent;
            let productQuantity = 1;

            // Check if the product is already in the cart
            const cartItems = cartDisplay.querySelectorAll(".cart-item");
            cartItems.forEach(item => {
                if (item.querySelector(".cart-item-name").textContent === productName) {
                    productQuantity = parseInt(item.querySelector(".cart-item-quantity").textContent) + 1;
                    item.querySelector(".cart-item-quantity").textContent = productQuantity;
                    return;
                }
            });

            // If the product is not in the cart, add it
            if (productQuantity === 1) {
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <span class="cart-item-name"><h3>${productName}</h3></span> -
                    <span class="cart-item-price"><h3>${productPrice}</h3></span> -
                    <span class="cart-item-quantity">${productQuantity}</span>
                    <button class="remove-from-cart">Remove</button>
                `;
                cartDisplay.appendChild(cartItem);
            }

            alert("Product added to cart");
        });
    });

    // Event listener for removing items from the cart
    cartDisplay.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-from-cart")) {
            const cartItem = event.target.parentElement;
            let productQuantity = parseInt(cartItem.querySelector(".cart-item-quantity").textContent);
            productQuantity--;

            if (productQuantity === 0) {
                cartItem.remove();
            } else {
                cartItem.querySelector(".cart-item-quantity").textContent = productQuantity;
            }
        }
    });
});