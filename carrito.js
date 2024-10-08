// Inicializar variables
let cartData = []; // Datos del carrito
const discountPercentage = 0.1; // 10% de descuento
const taxRate = 0.15; // 15% de impuesto

// Obtener elementos del DOM
const cartItems = document.querySelector("#cart-items");
const totalPrice = document.querySelector("#total-price-display");
const checkoutForm = document.querySelector("#checkout-form");
const shippingEstimationInput = document.querySelector("#shipping-estimation");

// Función para agregar un producto al carrito
// Función para agregar un producto al carrito
function addToCart(productId, name, price) {
    // Verificar si el producto ya está en el carrito
    const existingProduct = cartData.find(item => item.productId === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        // Agregar nuevo producto al carrito
        cartData.push({ productId, name, quantity: 1, price });
    }

    // Recalcular el total del carrito
    recalculateTotal();

    // Renderizar nuevamente los productos en el carrito
    renderCartItems();
}

// Función para eliminar un producto del carrito
function deleteItem(productId) {
    // Eliminar el producto del arreglo cartData
    cartData = cartData.filter(item => item.productId !== productId);

    // Recalcular el total del carrito
    recalculateTotal();

    // Renderizar nuevamente los productos en el carrito
    renderCartItems();
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(productId, quantity) {
    const product = cartData.find(item => item.productId === productId);
    if (product) {
        product.quantity = parseInt(quantity);
        if (product.quantity <= 0) {
            deleteItem(productId);
            return;
        }
    }

    // Recalcular el total del carrito
    recalculateTotal();

    // Renderizar nuevamente los productos en el carrito
    renderCartItems();
}

// Función para calcular y mostrar el total del carrito
function recalculateTotal() {
    let subtotal = 0;

    // Calcular el subtotal sumando el precio de cada producto por su cantidad
    for (const item of cartData) {
        subtotal += item.quantity * item.price;
    }

    // Calcular descuento e impuesto
    const discount = subtotal * discountPercentage;
    const tax = (subtotal - discount) * taxRate;

    // Calcular el total final
    const total = subtotal - discount + tax;

    // Mostrar el total en el DOM
    totalPrice.textContent = `Subtotal: LPS ${subtotal.toFixed(2)} - Descuento: LPS ${discount.toFixed(2)} + Impuesto: LPS ${tax.toFixed(2)} = Total: LPS ${total.toFixed(2)}`;
}

// Función para renderizar los productos en el carrito
// Función para renderizar los productos en el carrito
function renderCartItems() {
    cartItems.innerHTML = ""; // Limpiar el carrito antes de renderizar
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

// Función para finalizar la compra
function finalizarCompra() {
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const shippingEstimation = document.getElementById('shipping-estimation').value;

    // Validar que todos los campos estén completos
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

    // Mostrar una alerta con los datos de la compra
    alert(`Compra finalizada!\nDatos:\nCorreo: ${email}\nTeléfono: ${telefono}\nEstimación de envío: ${shippingEstimation}\nTotal: ${totalPrice.textContent}`);
}

// Evento para enviar el formulario de pago
checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Mostrar estimación de tiempo de envío en el input
    const shippingEstimationInputValue = "Tiempo de entrega aproximado: 3-5 días hábiles";
    shippingEstimationInput.value = shippingEstimationInputValue;

    // Aquí puedes agregar lógica adicional para procesar el pago, guardar en la base de datos, etc.
});

// Datos iniciales para el carrito (puedes eliminar esto o reemplazarlo con datos reales)
cartData = [
    { productId: 1, name: "Guess Jeans", quantity: 2, price: 530 },
    { productId: 2, name: "Magenda", quantity: 3, price: 550 },
];

// Renderizar los productos en el carrito inicial
renderCartItems();
recalculateTotal();
