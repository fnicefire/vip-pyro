document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/products')
    .then(response => response.json())
    .then(products => {
      const app = document.getElementById('app');
      let productsHtml = '<h1>Welcome to VIP Pyro</h1><div class="products">';

      products.forEach(product => {
        productsHtml += `
          <div class="product">
            <h2>${product.name}</h2>
            <p>${product.price}</p>
            <a href="/product/${product.id}">Dettagli</a>
          </div>
        `;
      });

      productsHtml += '</div>';
      app.innerHTML = productsHtml;
    })
    .catch(error => console.error('Error fetching products:', error));

  document.addEventListener('click', (event) => {
    if (event.target.matches('a[href^="/product/"]')) {
      event.preventDefault();
      const productId = event.target.getAttribute('href').split('/').pop();

      fetch(`/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
          const app = document.getElementById('app');
          app.innerHTML = `
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <p>${product.price}</p>
          `;
        })
        .catch(error => console.error('Error fetching product details:', error));
    }
  });
});
