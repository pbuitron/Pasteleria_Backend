const actualizarProducto = document.getElementById('actualizar-producto');
const crearProducto = document.getElementById('crear-producto');

// Agregar evento de clic al botón de actualizar producto
actualizarProducto.addEventListener('click', (e) => {
  e.preventDefault();
  // Agregar código para actualizar el producto
});

// Agregar evento de clic al botón de crear producto
crearProducto.addEventListener('click', (e) => {
  e.preventDefault();
  // Agregar código para crear el producto
});

// Agregar evento de cambio al checkbox de actualizar producto
const actualizarProductoCheckbox = document.getElementById('actualizar-producto-checkbox');
actualizarProductoCheckbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    actualizarProducto.style.display = 'block';
    crearProducto.style.display = 'none';
  } else {
    actualizarProducto.style.display = 'none';
    crearProducto.style.display = 'block';
  }
});