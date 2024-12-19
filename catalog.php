<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecommerce";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

$sql = "SELECT * FROM products";
$result = $conn->query($sql);

echo "<div class='product-grid'>";
while ($row = $result->fetch_assoc()) {
    $product_id = $row['id'];
    $variants = $conn->query("SELECT size, color FROM variants WHERE product_id = $product_id");
    
    echo "<div class='product-card'>";
    echo "<img src='" . $row['image'] . "' alt='" . $row['name'] . "'>";
    echo "<h3>" . $row['name'] . "</h3>";
    echo "<p>" . $row['description'] . "</p>";
    echo "<p>€" . $row['price'] . "</p>";
    
    echo "<p><strong>Varianti:</strong></p>";
    while ($variant = $variants->fetch_assoc()) {
        echo "<p>Taglia: " . $variant['size'] . " | Colore: " . $variant['color'] . "</p>";
    }
    
    echo "<button class='add-to-cart'>Aggiungi al carrello</button>";
    echo "</div>";
}
echo "</div>";

$conn->close();
?>
