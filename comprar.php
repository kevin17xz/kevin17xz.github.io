<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tienda_ropa";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Falló la conexión a la base de datos: " . $conn->connect_error);
}

// Verificar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Leer el cuerpo de la solicitud JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Obtener los datos del JSON
    $productoId = $data['producto_id'];
    $cantidad = $data['cantidad'];

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
                            // Respuesta de éxito en JSON
                            echo json_encode(["message" => "¡Datos guardados! ¡GRACIAS POR SU COMPRA!"]);
                        } else {
                            echo json_encode(["error" => "Error al guardar la compra: " . $stmt->error]);
                        }
                    } else {
                        echo json_encode(["error" => "Error en la preparación de la consulta: " . $conn->error]);
                    }
                } else {
                    echo json_encode(["error" => "No hay suficiente stock disponible."]);
                }
            } else {
                echo json_encode(["error" => "Producto no encontrado."]);
            }

            // Cerrar la declaración preparada
            $stmt->close();
        } else {
            echo json_encode(["error" => "Error en la preparación de la consulta: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Datos inválidos proporcionados."]);
    }
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
