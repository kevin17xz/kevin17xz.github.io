document.addEventListener("DOMContentLoaded", function() {
    // Coloca aquí todo el código que interactúa con el DOM
    // Código de inicialización de variables
    let cartData = []; // Datos del carrito
    const discountPercentage = 0.1; // 10% de descuento
    const taxRate = 0.15; // 15% de impuesto

    // Obtener elementos del DOM
    const cartItems = document.querySelector("#cart-items");
    const totalPrice = document.querySelector("#total-price-display");
    const checkoutForm = document.querySelector("#checkout-form");
    const shippingEstimationInput = document.querySelector("#shipping-estimation");

    // Funciones de agregar, eliminar, actualizar y renderizar productos en el carrito
    function addToCart(productId, name, price) {
        const existingProduct = cartData.find(item => item.productId === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cartData.push({ productId, name, quantity: 1, price });
        }
        recalculateTotal();
        renderCartItems();
    }

    function deleteItem(productId) {
        cartData = cartData.filter(item => item.productId !== productId);
        recalculateTotal();
        renderCartItems();
    }

    function updateQuantity(productId, quantity) {
        const product = cartData.find(item => item.productId === productId);
        if (product) {
            product.quantity = parseInt(quantity);
            if (product.quantity <= 0) {
                deleteItem(productId);
                return;
            }
        }
        recalculateTotal();
        renderCartItems();
    }

    function recalculateTotal() {
        let subtotal = 0;
        for (const item of cartData) {
            subtotal += item.quantity * item.price;
        }
        const discount = subtotal * discountPercentage;
        const tax = (subtotal - discount) * taxRate;
        const total = subtotal - discount + tax;
        totalPrice.textContent = `Subtotal: LPS ${subtotal.toFixed(2)} - Descuento: LPS ${discount.toFixed(2)} + Impuesto: LPS ${tax.toFixed(2)} = Total: LPS ${total.toFixed(2)}`;
    }

    function renderCartItems() {
        cartItems.innerHTML = "";
        cartData.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.name}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.productId}, this.value)"></td>
                <td>LPS ${item.price.toFixed(2)}</td>
                <td>LPS ${(item.quantity * item.price).toFixed(2)}</td>
                <td><button onclick="deleteItem(${item.productId})">Eliminar</button></td>
            `;
            cartItems.appendChild(tr);
        });
    }

    function finalizarCompra() {
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const shippingEstimation = document.getElementById('shipping-estimation').value;

        if (!email || !telefono) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const purchaseData = {
            cartData: cartData,
            email: email,
            telefono: telefono,
            shippingEstimation: shippingEstimation
        };

        alert(`Compra finalizada!\nDatos:\nCorreo: ${email}\nTeléfono: ${telefono}\nEstimación de envío: ${shippingEstimation}\nTotal: ${totalPrice.textContent}`);
    }

    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const shippingEstimationInputValue = "Tiempo de entrega aproximado: 3-5 días hábiles";
        shippingEstimationInput.value = shippingEstimationInputValue;
    });

    // Datos iniciales para el carrito
    cartData = [
        { productId: 1, name: "Guess Jeans", quantity: 2, price: 530 },
        { productId: 2, name: "Magenda", quantity: 3, price: 550 },
    ];

    renderCartItems();
    recalculateTotal();
});
