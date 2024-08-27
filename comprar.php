<?php
// Conectar a la base de datos
$servername = "localhost"; $username = "root"; $password = ""; $dbname = "tienda_ropa";
$conn =  new mysqli($this->servidor, $this->usuario_mysql, $this->clave_mysql, $this->basedatos_mysql);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener los datos de la compra desde la URL
$producto_id = $_GET['producto'];
$precio = $_GET['precio'];
$usuario_id = 1; // Reemplaza con el ID del usuario actual

// Preparar la consulta SQL
$sql = "INSERT INTO compras (producto_id, usuario_id, fecha_compra, total)
       VALUES (?, ?, NOW(), ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iid", $producto_id, $usuario_id, $precio);

if ($stmt->execute()) {
    echo "<p>¡Registro Guardado! Gracias por tu compra.</p>";
} else {
    echo "Error al guardar la compra: " . $stmt->error;
}

// Cerrar la conexión a la base de datos
$stmt->close();
$conn->close();
?>