import { Router } from "express"
import ProductManager from "../manager/product_manager.js"
import upload from "../controllers/multer.controller.js"
import multer from "multer"


const productRouter = Router()
const productManager = new ProductManager()



productRouter.route('/')
.get(async (req, res) =>  {
    try {
        const productos = await productManager.getAllProducts()
        res.render('home', {productos, title:'Productos'});
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos - vw' });
    }
})


productRouter.route('/realtimeproducts')
.get(async (req, res) =>  {
    try {
        //const productos = await productManager.getAllProducts()
        res.render('realtimeproducts', {
           
            title:'Nuevo Producto',
            path: 'realtimeproducts',
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos - vw' });
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

  productRouter.route('/realtimeproducts/:id')
  .get(async (req, res)=>{

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

  .delete(async (req, res)=>{
    const productoeliminado = await productManager.deleteProduct(req)
    res.status(200).json(productoeliminado)
  })


export default productRouter