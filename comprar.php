<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "1234567";
$dbname = "tienda_ropa";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Falló la conexión a la base de datos: " . $conn->connect_error);
}

// Verifica si se realizó una solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtiene los datos enviados desde el formulario
    $productoId = $_POST['productoId'];
    $cantidad = $_POST['cantidad'];

    // Consulta el producto en la base de datos
    $sql = "SELECT * FROM productos WHERE id=?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $productoId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            $stockDisponible = $row['cantidad'];
            if ($cantidad <= $stockDisponible) {
                // Actualiza la base de datos con los detalles de compra
                $sql = "INSERT INTO compras (nombre_producto, precio, cantidad, fecha_compra)
                        VALUES (?, ?, ?, NOW())";
                if ($stmt = $conn->prepare($sql)) {
                    $stmt->bind_param("sdi", $row['nombre'], $row['precio'], $cantidad);
                    $stmt->execute();

                    // Muestra un mensaje de éxito al usuario
                    echo "<p>¡Datos guardados! ¡GRACIAS POR SU COMPRA!</p>";
                } else {
                    die("Falló la consulta: " . $conn->error);
                }
            } else {
                // Muestra un mensaje si el producto no está disponible en la cantidad seleccionada
                echo "<p>No tenemos suficientes unidades disponibles para esa cantidad.</p>";
            }
        } else {
            echo "<p>Producto no encontrado.</p>";
        }
    } else {
        die("Falló la consulta: " . $conn->error);
    }

    // Cierra las sentencias preparadas y la conexión a la base de datos
    $stmt->close();
    $conn->close();
}
?>
