<?php
// Connessione al database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecommerce";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Dati del prodotto
$name = $_POST['name'];
$description = $_POST['description'];
$price = $_POST['price'];
$image = $_FILES['image']['name'];
$target_dir = "uploads/";
$target_file = $target_dir . basename($image);

// Salva l'immagine sul server
if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
    // Inserisci il prodotto nel database
    $sql = "INSERT INTO products (name, description, price, image) VALUES ('$name', '$description', $price, '$target_file')";
    if ($conn->query($sql) === TRUE) {
        $product_id = $conn->insert_id;
        
        // Inserisci le varianti
        foreach ($_POST['sizes'] as $index => $size) {
            $color = $_POST['colors'][$index];
            $sql_variant = "INSERT INTO variants (product_id, size, color) VALUES ($product_id, '$size', '$color')";
            $conn->query($sql_variant);
        }
        
        echo "Prodotto inserito con successo!";
    } else {
        echo "Errore: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Errore durante il caricamento dell'immagine.";
}

$conn->close();
?>
