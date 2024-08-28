<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "1234567";
$dbname = "tienda_ropa";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Falló la conexión a la base de datos: " . $conn->connect_error);
}

// Verificar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener datos del formulario
    $productoId = $_POST['productoId'];
    $cantidad = $_POST['cantidad'];

    // Verificar que los datos sean válidos
    if ($productoId && $cantidad) {
        // Consulta para obtener el producto
        $sql = "SELECT * FROM productos WHERE id=?";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("i", $productoId);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($row = $result->fetch_assoc()) {
                // Verificar si hay suficiente stock disponible
                if ($cantidad <= $row['cantidad']) {
                    // Insertar detalles de la compra en la base de datos
                    $sql = "INSERT INTO compras (nombre_producto, precio, cantidad, fecha_compra)
                            VALUES (?, ?, ?, NOW())";
                    if ($stmt = $conn->prepare($sql)) {
                        $stmt->bind_param("sdi", $row['nombre'], $row['precio'], $cantidad);
                        if ($stmt->execute()) {
                            // Mensaje de éxito
                            echo "<p>¡Datos guardados! ¡GRACIAS POR SU COMPRA!</p>";
                        } else {
                            echo "<p>Error al guardar la compra: " . $stmt->error . "</p>";
                        }
                    } else {
                        echo "<p>Error en la preparación de la consulta: " . $conn->error . "</p>";
                    }
                } else {
                    echo "<p>No hay suficiente stock disponible.</p>";
                }
            } else {
                echo "<p>Producto no encontrado.</p>";
            }

            // Cerrar la declaración preparada
            $stmt->close();
        } else {
            echo "<p>Error en la preparación de la consulta: " . $conn->error . "</p>";
        }
    } else {
        echo "<p>Datos inválidos proporcionados.</p>";
    }
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
