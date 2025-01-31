import { Router } from "express";
import CartManager from "../manager/cart_manager.js";


const cartRouter = Router()
const cartsManager = new CartManager()

cartRouter.route('/')
.get(async (req, res)=>{
    try {
        const carrritos = await cartsManager.getAllCarts()
        res.status(200).json(carrritos)
        return carrritos
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los carritos CR", error: error.message });
    }
} )
.post(async (req, res) => {
    try {
        const nuevoCarrito = cartsManager.createNewCart()
        res.status(201).json(nuevoCarrito)
        return nuevoCarrito
    } catch (error) {
        res.status(500).json({ message: "Error al crear carrito CR", error: error.message });
        
    }
})

cartRouter.route('/:cid')
.get(async (req, res) => {
    try {
        const carrito = await cartsManager.getCartById(req, res)
        if(!carrito) return res.status(404).json({message: "Carrito no encontrado"})
        
        res.status(200).json(carrito)
        return carrito


    } catch (error) {
        res.status(500).json({ message: `Error al obtener el carrito con id ${req}`, error: error.message })
    }
})
.put(async (req, res)=>{
    try {
        
    } catch (error) {
        
    }
})

cartRouter.route('/:cid/products/:pid')
.post(
    async (req, res, next) => {
        try {
            await cartsManager.checkStatusproduct(req, res, next)
        } catch (error) {
            res.status(500).json({ message: "Error al verificar el producto", error: error.message });
        }
    },
    async (req, res)=>{
        try {
            const carritoActualizado = await cartsManager.productInCart(req, res)
            res.status(200).json(carritoActualizado)
            return carritoActualizado
        } catch (error) {
            res.status(500).json({ message: "Error al agregar producto al carrito", error: error.message });
        }
})
.delete(
    async (req, res ) => {
        try {
            const carritoActualizado = await cartsManager.removeProductFromCart(req, res)
            res.status(200).json({message: "Producto Eliminado del carrito", carrito:carritoActualizado})
            return carritoActualizado
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar producto del carrito", error: error.message });

        }
    }
)
.put(async(req, res)=>{
    try {
        const carritoModificado = await cartsManager.updateProductQuantity(req, res)
        res.status(200).json({message: "Cantidad actualizada carrito", carrito:carritoModificado})
        return carritoModificado
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el carrito", error: error.message });
        
    }
})



export default cartRouter