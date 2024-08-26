<?php

if (isset($_POST['confirmar_compra'])) {

    // Conectar a la base de datos
    $servername = "localhost"; $username = ""; $password = ""; $dbname = "tienda_ropa";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    // Obtener los datos de la compra desde el formulario
    $producto_id = $_POST['producto_id'];
    $precio = $_POST['total'];
    $usuario_id = 1; // Reemplaza con el ID del usuario actual

    // Preparar la consulta SQL
    $sql = "INSERT INTO compras (producto_id, usuario_id, fecha_compra, total) 
           VALUES (?, ?, NOW(), ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iid", $producto_id, $usuario_id, $precio);

    if ($stmt->execute()) {
        echo "¡Registro Guardado! Gracias por tu compra.";
    } else {
        echo "Error al guardar la compra: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();

} else {

    // Mostrar el formulario si no se ha enviado nada aún
    ?>

    <form method="post" action="">
        <input type="hidden" name="producto_id" value="<?php echo $_GET['producto']; ?>">
        <input type="hidden" name="total" value="<?php echo $_GET['precio']; ?>">
        <!-- Más campos del formulario aquí -->
        <input type="submit" name="confirmar_compra" value="Confirmar compra">
    </form>

    <?php

}
?>