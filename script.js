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

//login
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const messageBox = document.getElementById('message-box');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Make API call to fetch user data
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then(data => {
                const user = data.find(user => user.name === username && user.email === password);
                if (user) {
                    showMessage('success', 'Login successful');
                } else {
                    showMessage('error', 'Invalid username or password');
                }
            })
            .catch(error => {
                showMessage('error', error.message);
            });
    });

    function showMessage(type, message) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;

        // Show the message box
        messageBox.style.display = 'block';
        // Add class based on message type (success or error)
        messageBox.className = 'message-box-container ' + type;
    }
});


// signup
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    const messageBox = document.getElementById('message-box');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Retrieve form input values
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const email = document.getElementById('email').value;

        // Validate input fields
        let errorMessage = '';
        if (!isValidUsername(username)) {
            errorMessage += 'Invalid username. ';
        }
        if (!isValidPassword(password)) {
            errorMessage += 'Invalid password. ';
        }
        if (!isValidConfirmPassword(password, confirmPassword)) {
            errorMessage += 'Passwords do not match. ';
        }
        if (!isValidEmail(email)) {
            errorMessage += 'Invalid email. ';
        }

        // Display appropriate message
        showMessage(errorMessage ? 'error' : 'success', errorMessage || 'Signup successful!');
    });

    // Function to validate username
    function isValidUsername(username) {
        const regex = /^[a-zA-Z][\w-]{2,19}$/;
        return regex.test(username);
    }

    // Function to validate password
    function isValidPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+\[\]{}|;:'",.<>?/`~])[A-Za-z\d!@#$%^&*()-_=+\[\]{}|;:'",.<>?/`~]{8,}$/;
        return regex.test(password);
    }

    // Function to validate confirm password
    function isValidConfirmPassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    // Function to validate email
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Function to display message in message box
    function showMessage(type, message) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;

        // Show the message box
        messageBox.style.display = 'block';
        // Add class based on message type (success or error)
        messageBox.className = 'signup-message-box-container ' + type;
    }
});
