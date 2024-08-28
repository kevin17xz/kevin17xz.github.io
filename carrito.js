// Obtener elementos del DOM
const cartItems = document.querySelector("#cart-items");
const totalPrice = document.querySelector("#total-price");
const checkoutForm = document.querySelector("#checkout-form");
const shippingEstimationInput = document.querySelector("#shipping-estimation");

// Inicializar variables
let cartData = []; // Arreglo para almacenar los productos en el carrito

// Función para actualizar la cantidad de un producto
function updateQuantity(productId, newQuantity) {
    // Actualizar la cantidad del producto en el arreglo cartData
    const itemIndex = cartData.findIndex((item) => item.productId === productId);
    cartData[itemIndex].quantity = newQuantity;

    // Recalcular el total del carrito
    recalculateTotal();

    // Renderizar nuevamente los productos en el carrito
    renderCartItems();
}

// Función para eliminar un producto del carrito
function deleteItem(productId) {
    // Eliminar el producto del arreglo cartData
    const itemIndex = cartData.findIndex((item) => item.productId === productId);
    if (itemIndex !== -1) {
        cartData.splice(itemIndex, 1);
    }

    // Recalcular el total del carrito
    recalculateTotal();

    // Renderizar nuevamente los productos en el carrito
    renderCartItems();
}

// Función para calcular y mostrar el total del carrito
function recalculateTotal() {
    let totalPriceValue = 0;
    for (const item of cartData) {
        totalPriceValue += item.quantity * item.price;
    }
    totalPrice.textContent = totalPriceValue.toFixed(2);
}

// Función para renderizar los productos en el carrito
function renderCartItems() {
    cartItems.innerHTML = "";
    for (const item of cartData) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.name}</td>
            <td><input type="number" value="${item.quantity}" onchange="updateQuantity(${item.productId}, ${item.quantity})"></td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${(item.quantity * item.price).toFixed(2)}</td>
        `;
        cartItems.appendChild(tr);
    }
}

// Evento para enviar el formulario de pago
checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Mostrar estimación de tiempo de envío en el input
    const shippingEstimationInputValue = "Tiempo de entrega aproximado: 3-5 días hábiles";
    shippingEstimationInput.value = shippingEstimationInputValue;
});

// Cargar los productos en el carrito desde la base de datos (sustituye esto con su propia lógica)
cartData = [
    { productId: 1, name: "Producto 1", quantity: 2, price: 10.99 },
    { productId: 2, name: "Producto 2", quantity: 3, price: 19.99 }
];

// Renderizar los productos en el carrito inicial
renderCartItems();
recalculateTotal();