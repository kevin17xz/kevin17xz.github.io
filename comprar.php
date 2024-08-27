<?php

// Conectar a la base de datos
$servername = "localhost"; $username = ""; $password = ""; $dbname = "tienda_ropa";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener los datos de la compra desde el formulario
$productId = (int) $_POST['producto_id'];
$purchasePrice = (float) $_POST['total'];
$userId = 1; // Reemplaza con el ID del usuario actual

// Preparar la consulta SQL para insertar una nueva compra
$sql = "INSERT INTO compras (producto_id, usuario_id, fecha_compra, total)
       VALUES (?, ?, NOW(), ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iid", $productId, $userId, $purchasePrice);

if ($stmt->execute()) {
    echo "¡Registro Guardado! Gracias por tu compra.";
} else {
    echo "Error al guardar la compra: " . $stmt->error;
}

// Cerrar la conexión a la base de datos
$stmt->close();
$conn->close();

?> 