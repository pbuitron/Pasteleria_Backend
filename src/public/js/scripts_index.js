


 // Redirigir al detalle del producto al hacer clic en la tarjeta
 document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function () {
        const productId = this.getAttribute('data-id');
        window.location.href = `/product/${productId}`;
    });
});