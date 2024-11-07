document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Mock data for cart items
    const mockCartData = [
        {
            id: 1,
            name: 'Blue T-shirt',
            price: 25.99,
            quantity: 1,
            image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        },
        {
            id: 2,
            name: 'Jeans',
            price: 45.99,
            quantity: 1,
            image: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        }
    ];

    // Function to render cart items
    function renderCartItems() {
        cartItemsContainer.innerHTML = ''; // Clear the cart items container
        mockCartData.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="quantity">
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                </div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });

        // Attach event listeners for quantity changes and item removal
        document.querySelectorAll('.quantity input').forEach(input => {
            input.addEventListener('input', updateTotalPrice);
        });
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });

        updateTotalPrice(); // Initial total price update
    }

    // Function to update the total price
    function updateTotalPrice() {
        let total = 0;
        mockCartData.forEach(item => {
            const quantity = parseInt(document.querySelector(`input[data-id="${item.id}"]`).value);
            total += item.price * quantity;
        });
        totalPriceElement.textContent = total.toFixed(2);
    }

    // Function to remove an item from the cart
    function removeItem(e) {
        const itemId = parseInt(e.target.getAttribute('data-id'));
        const itemIndex = mockCartData.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            mockCartData.splice(itemIndex, 1); // Remove item from mock data
            renderCartItems(); // Re-render the cart
        }
    }

    renderCartItems(); // Initial render of cart items
});
