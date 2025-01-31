import Cart from "../model/carts.model.js";
import Product from "../model/product.model.js";

class CartManager{

    async addNewCart(req, res){
        try {
            const nuevoCarrito = new Cart({products:[]})
            await nuevoCarrito.save()
            res.status(201).json(nuevoCarrito);
            console.log('Carrito creado satisfactoriamente')
        } catch (error) {
            res.status(500).json({ message: "Error al crear el carrito", error: error.message });
        }
    }


}

export default CartManager