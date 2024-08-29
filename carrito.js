/// Obtener elementos del DOM
const cartItems = document.querySelector("#cart-items");
const totalPrice = document.querySelector("#total-price");
const checkoutForm = document.querySelector("#checkout-form");
const shippingEstimationInput = document.querySelector("#shipping-estimation");

// Inicializar variables
// Inicializar variables
let cartData = []; // Arreglo para almacenar los productos en el carrito

// Función para agregar un producto al carrito
function addToCart(productId) {
  // Obtener información del producto a agregar al carrito (sustituye esto con tu propia lógica de base de datos)
  const productNameById = {1: "Producto 1", 2: "Producto 2"};
  const productInfo = productNameById[productId];
  
  // Crear un objeto para el producto y agregarlo al arreglo cartData
  cartData.push({ productId, name: productInfo, quantity: 1, price: 0 }); // Sustituye esto con la lógica de precios correcta

  // Recalcular el total del carrito
  recalculateTotal();

  // Renderizar nuevamente los productos en el carrito
  renderCartItems();
}

// ... (el resto del código permanece igual)


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
            <td><button onclick="deleteItem(${item.productId})">Eliminar</button></td>
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
// Definir variables de promociones, descuentos, y el impuesto
const discountPercentage = 0.10; // Descuento del 10%
const taxRate = 0.15; // Impuesto del 15%

// Función para calcular y mostrar el total del carrito
function recalculateTotal() {
    let subtotal = 0;

    // Calcular el subtotal sumando el precio de cada producto por su cantidad
    for (const item of cartData) {
        subtotal += item.quantity * item.price;
    }

    // Aplicar descuento (si aplica)
    const discount = subtotal * discountPercentage;
    const subtotalAfterDiscount = subtotal - discount;

    // Calcular el impuesto
    const tax = subtotalAfterDiscount * taxRate;

    // Calcular el total final
    const total = subtotalAfterDiscount + tax;

    // Mostrar los cálculos detallados al usuario
    const discountElement = document.querySelector("#discount");
    const taxElement = document.querySelector("#tax");
    const subtotalElement = document.querySelector("#subtotal");
    subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    discountElement.textContent = `Descuento: -$${discount.toFixed(2)}`;
    taxElement.textContent = `Impuesto: +$${tax.toFixed(2)}`;
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

// Renderizar los productos en el carrito inicial
renderCartItems();
recalculateTotal();
