import Cart from "../model/carts.model.js";
import Product from "../model/product.model.js";

class CartManager {

    async createNewCart(req, res) {
        try {
            const nuevoCarrito = new Cart({ products: [] })
            await nuevoCarrito.save()
            return nuevoCarrito

        } catch (error) {
            console.error('Error al crear el carrito - CM:', error);
            throw error;
        }
    }

    async getAllCarts(req, res) {
        try {
            const carritos = Cart.find().lean()
            return carritos
        } catch (error) {
            console.error('Error al obtener el carrito - CM:', error);
            throw error;
        }
    }

    async getCartById(req, res){
        try {
            const {cid}= req.params
            const carrito = Cart.findById(cid).populate('products.product', 'title description price stock')
            if (carrito)  console.log(carrito)
            return carrito

        } catch (error) {
            console.error('Error al obtener el carrito por ID - CM:', error);
            throw error;
        }
    }
    async checkStatusproduct (req, res, next){
        try {
            const {pid} = req.params
            const producto = await Product.findById(pid)
            if(!producto) return console.log('Producto no encontrado')
            if(!producto.status) return console.log('Producto no disponible')
            req.producto = producto
            console.log(req.producto)
            next()
        } catch (error) {
            console.error('Error al verificar producto CSP ID - CM:', error);
                throw error;
        }
    }
    async productInCart(req, res){
try {
            const { cid, pid} = req.params
        const carrito = await Cart.findById(cid)

        if(!carrito) return console.log('Cart no encontrado')
        
        const productoIncart = carrito.products.findIndex(prod =>prod.product.toString()===pid)
        if(productoIncart !== -1) {
            carrito.products[productoIncart].quantity += 1;
        } else {
            carrito.products.push({product: pid, quantity: 1});
        }

        await carrito.save()
        return carrito
} catch (error) {
    console.error('Error al agregar producto al Cart ID - CM:', error);
                throw error;
}


    }
    async removeProductFromCart(req, res){
        try {
            const { cid, pid} = req.params
            const carrito = await Cart.findById(cid)
            if(!carrito) return console.log('Cart no encontrado')
            
            carrito.products = carrito.products.filter(
                prod => prod.product.toString()!==pid
            )
            await carrito.save()
            return carrito
        } catch (error) {
            console.error('Error al eliminar producto del Cart - CM:', error);
                throw error;
        }
    }

    async clearCart(req, res){
        try {
            const {cid} = req.params
            const carrito = await Cart.findById(cid)
            if(!carrito) return console.log('Cart no encontrado')

            carrito.products = []
            await carrito.save()
            return carrito
        } catch (error) {
            console.error('Error al vaciar Cart - CM:', error);
                throw error;
        }
    }
    async updateProductQuantity(req, res){
        try {
            const {cid, pid} = req.params
            const {quantity} = req.body
            if(quantity <1 ) return console.log('Cantidad dene ser mayor a 0')
            
            const carrito = await Cart.findById(cid)
            if(!carrito) return console.log('Cart no encontrado')

            const indiceProducto = carrito.products.findIndex(prod => prod.product.toString()=== pid)
            if(indiceProducto===-1)return console.log('Producto no encontrado')

            carrito.products[indiceProducto].quantity = quantity
            await carrito.save()
            return carrito

        } catch (error) {
            console.error('Error al actualizar Cart - CM:', error);
                throw error;
        }
    }
}

export default CartManager