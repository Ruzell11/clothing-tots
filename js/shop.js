document.addEventListener('DOMContentLoaded', () => {
    const productListContainer = document.getElementById('product-list');
    const cartCount = document.getElementById('cart-count'); // To show the cart count

    // Mock product data
    const mockProducts = [
        {
            id: 1,
            name: 'Blue T-shirt',
            price: 25.99,
            image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
            description: 'Comfortable cotton blue T-shirt.'
        },
        {
            id: 2,
            name: 'Stylish Jeans',
            price: 45.99,
            image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
            description: 'Slim-fit, high-waist stylish jeans.'
        },
        {
            id: 3,
            name: 'Red Hoodie',
            price: 35.99,
            image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
            description: 'Warm and cozy hoodie for chilly days.'
        },
        {
            id: 4,
            name: 'Black Jacket',
            price: 65.99,
            image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
            description: 'Stylish black leather jacket.'
        },
        {
            id: 5,
            name: 'White Sneakers',
            price: 55.99,
            image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
            description: 'Casual white sneakers for everyday wear.'
        },
        {
            id: 6,
            name: 'Gray Sweatpants',
            price: 30.99,
            image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
            description: 'Soft and comfy sweatpants for lounging.'
        }
    ];

    // Initialize cart array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update the cart count display
    function updateCartCount() {
        cartCount.textContent = cart.length; // Update the cart count in the header
    }

    // Function to render the product list
    function renderProducts() {
        productListContainer.innerHTML = ''; // Clear existing products

        mockProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
            `;
            productListContainer.appendChild(productDiv);
        });
    }

    // Event listener for the "Add to Cart" button
    productListContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            const product = mockProducts.find(p => p.id == productId);

            // Add the selected product to the cart
            cart.push(product);

            // Save the cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update cart count
            updateCartCount();
        }
    });

    renderProducts(); // Initial rendering of products
    updateCartCount(); // Update the cart count when the page loads
});
