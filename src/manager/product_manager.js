import Product from "../model/product.model.js";
import {unlink} from 'fs/promises'


class ProductManager {
  async getAllProducts(limit = 10, page = 1, filter = {}, sort = {}) {
    try {
      const productos = await Product.paginate(filter, {
        limit,
        page,
        sort,
        lean: true
      });
  
      return productos;
    } catch (error) {
      console.error('Error al obtener productos / pm:', error);
      throw error;
    }
  }
  



   async getProductById(req, res) {
    try {
      const { pid} = req.params
      const producto = await Product.findById(pid).lean()
      
      if (producto) {
        console.log({producto});
        return producto
    } else {
        console.log('Producto no encontrado')
    }
      
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      throw error;
    }
  }

  async createProduct(req, res) {
    try {
      const { title, description, code, price, status, stock, category } = req.body;

      const producto = new Product();
      producto.title = title;
      producto.description = description;
      producto.code = code;
      producto.price = price;
      producto.status = status;
      producto.stock = stock;
      producto.category = category;
      producto.thumbnails = `/img/${req.file.filename}`;

      await producto.save()
      return producto

    } catch (error) {
      console.error('Error al crear producto - PM:', error);
      throw error;
    }
  }


  async updateProduct(req, res) {
    try {
      const productId = req.params.pid;
      const products = await Product.findById(productId);
  
      if (!products) {
        console.log('No se encontró el producto solicitado');
        return { error: 'Producto no encontrado' };
      }

      const { title, description, code, price, status, stock, category, thumbnails } = req.body;

      if (title !== undefined) products.title = title;
      if (description !== undefined) products.description = description;
      if (code !== undefined) products.code = code;
      if (price !== undefined) products.price = price;
      if (status !== undefined) products.status = status;
      if (stock !== undefined) products.stock = stock;
      if (category !== undefined) products.category = category;
      if (thumbnails !== undefined) products.thumbnails = thumbnails;
  
      const productoActualizado = await Product.findByIdAndUpdate(productId, req.body, { new: true });
  
      return productoActualizado;
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      throw err;
    }
  }
  async deleteProduct(req) {
    try {

      const productId = req.params.pid
      const productoAEliminar =await Product.findById(productId)
      if (!productoAEliminar) {
        console.log('No se encontró el producto solicitado');
        return { error: 'Producto no encontrado' };

      } else {
        await Product.findByIdAndDelete(productId);
        await unlink(`./src/public/${productoAEliminar.thumbnails}`)
      return { message: 'Producto eliminado con éxito' }
      }
      
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  }
}
export default ProductManager