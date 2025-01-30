import { Router } from "express";
import upload from "../controllers/multer.controller.js";
import multer from "multer";
import ProductManager from "../manager/product_manager.js";



const viewRouter = Router()

const productManager = new ProductManager()

viewRouter.route('/')
  .get(async (req, res) => {
    try {
      res.render('realtimeproducts',
        {
          title: "Crear Nuevo Producto",
          path: 'realtimeproducts'
        }

      )
    } catch (error) {
      console.error('Error al cargar producto:', error);
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

export default viewRouter