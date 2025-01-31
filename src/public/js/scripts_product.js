  // Lógica para agregar al carrito
  document.querySelector('.add-to-cart-button').addEventListener('click', function () {
    const productId = this.getAttribute('data-id');
    fetch(`/api/cart/add/${productId}`, {
        method: 'POST',
    }).then(response => response.json())
    .then(data => alert('Producto agregado al carrito 🛒'))
    .catch(error => console.error('Error:', error));
});