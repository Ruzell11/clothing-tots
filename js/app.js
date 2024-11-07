// Load and display products on the home page
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("products")) {
        fetchProducts();
    }
    if (document.getElementById("cart-items")) {
        displayCart();
    }
});

// Fetch products from products.json and display them
async function fetchProducts() {
    const response = await fetch('products.json');
    const products = await response.json();
    const productContainer = document.getElementById('products');

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button >Shop Now</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Add product to cart
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

// Display cart items
async function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const response = await fetch('products.json');
    const products = await response.json();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        const itemTotal = product.price * cartItem.quantity;
        total += itemTotal;

        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Quantity: ${cartItem.quantity}</p>
            <p>Price: $${itemTotal.toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}


// Sticky Navbar Scroll Effect
window.addEventListener("scroll", function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});