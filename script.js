// Prodotti disponibili
const products = [
    { id: 1, name: "Felpa Uomo", price: 29.99, image: "assets/placeholder.jpg" },
    { id: 2, name: "T-shirt Donna", price: 19.99, image: "assets/placeholder.jpg" },
    { id: 3, name: "Pantaloni", price: 49.99, image: "assets/placeholder.jpg" },
];

// Stato del carrello
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Aggiorna localStorage
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Aggiungi prodotto al carrello
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    alert(`${product.name} è stato aggiunto al carrello.`);
}

// Renderizza prodotti nella pagina "Prodotti"
function renderProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>€${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Aggiungi al Carrello</button>
        `;
        productList.appendChild(productCard);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Renderizza carrello nella pagina "Carrello"
function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Il carrello è vuoto.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>€${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Gestisci checkout
document.getElementById('checkout-button')?.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Il carrello è vuoto!');
        return;
    }

    alert('Grazie per il tuo ordine!');
    cart = [];
    updateCart();
    renderCart();
});

// Inizializza
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
});
