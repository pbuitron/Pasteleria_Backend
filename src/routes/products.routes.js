import { Router } from "express"
import ProductManager from "../manager/product_manager.js"
import upload from "../controllers/multer.controller.js"
import multer from "multer"


const productRouter = Router()
const productManager = new ProductManager()




productRouter.route('/')
.get(async (req, res) => {
  try {
    const { limit, page, category, status, sort } = req.query;

    const limitNumber = limit ? parseInt(limit, 10) : 10;
    const pageNumber = page ? parseInt(page, 10) : 1;

    if (isNaN(limitNumber) || limitNumber < 1) {
      return res.status(400).json({ status: "error", message: "El límite debe ser un número positivo" });
    }
    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ status: "error", message: "La página debe ser un número positivo" });
    }


    let filter = {};
    

    if (category) filter.category = category;
    if (status) filter.status = status === "true"; 
    console.log(filter);
    
    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    if (sort === "desc") sortOption.price = -1;

    
    const productos = await productManager.getAllProducts(limitNumber, pageNumber, filter, sortOption);
    console.log(productos);
   
    res.render('home', {
      
      productos: productos.docs,
      pagination: {
        totalPages: productos.totalPages,
        currentPage: productos.page,
        hasPrevPage: productos.hasPrevPage,
        hasNextPage: productos.hasNextPage,
        prevPage: productos.prevPage,
        nextPage: productos.nextPage,
      },
      filters: { category, status, sort },
      title: 'Productos en Stock',
      path: 'home',
    });
  
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
})

  .post(upload.single('thumbnails'), async (req, res) => {
    try {
      const nuevoProducto = await productManager.createProduct(req);

      res.render('realtimeproducts', {
        producto: nuevoProducto,
        path: 'realtimeproducts',
        title: 'Nuevo Producto'
      });
    } catch (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          res.status(400).json({ success: false, error: 'El archivo es demasiado grande. El tamaño máximo permitido es de 5 MB.' });
        } else {
          res.status(400).json({ success: false, error: err.message });
        }
      } else {
        res.status(400).json({ success: false, error: err.message });
      }
    }
  });

productRouter.route('/:pid')
  .get(async (req, res) => {

    try {
      const producto = await productManager.getProductById(req)
      res.status(200).json(producto)
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      res.status(500).json({ message: 'Error al obtener producto por id - rt' });
    }



  })

  .put(upload.single('thumbnails'), async (req, res) => {
    try {
      const productoActualizado = await productManager.updateProduct(req, res);
      res.status(200).json(productoActualizado);
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      res.status(500).json({ message: 'Error al actualizar producto' });
    }
  })

  .delete(async (req, res) => {
    const productoeliminado = await productManager.deleteProduct(req)
    res.status(200).json(productoeliminado)
  })


export default productRouter