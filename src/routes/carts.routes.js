import { Router } from "express";
import CartManager from "../manager/cart_manager.js";


const cartRouter = Router()
const cartsManager = new CartManager()

cartRouter.route('/')
    .get(async (req, res) => {
        try {
            const carritos = await cartsManager.getAllCarts()
            return res.status(201).json({ 
                status: "success",
                message: "Importación  exitosa de Carts ",
                carritos })

        } catch (error) {
            res.status(500).json({ 
                status: "error",
                message: "Error al obtener los carritos CR", 
                error: error.message });
        }
    })
    .post(async (req, res) => {
        try {
            const nuevoCarrito = await cartsManager.createNewCart()
            console.log(nuevoCarrito);
            return res.status(201).json({
                status: "success",
                message: "Cart creado exitosamente - CR", 
                nuevoCarrito })

        } catch (error) {
            res.status(500).json({ 
                status: "error",
                message: "Error al crear carrito CR",
                error: error.message });

        }
    })

cartRouter.route('/:cid')
    .get(async (req, res) => {
        try {
            const carrito = await cartsManager.getCartById(req, res)
            if (!carrito) return res.status(404).json({ 
                error: "Carrito no encontrado",
                carrito: { products: [] }
            })
            
            res.render("productoencarrito", { carrito, path:'productoencarrito', title: 'Carrito' });
            /*
            return res.status(200).json({
                status: "success",
                message: "Carrito obtenido satisfactoria - CR",
                carrito})
           */ 


        } catch (error) {
            
            res.status(500).json({ 
                status: 'error',
                message: `Error al obtener el carrito con id ${req}`, error: error.message })
        }
    })
    .put(async (req, res) => {
        try {

        } catch (error) {

        }
    })
    .delete(async (req, res) => {
        try {
            const vaciarCarrito = await cartsManager.clearCart(req, res)
            return res.status(201).json({ vaciarCarrito, message: "Carrito vacio" })
        } catch (error) {
            res.status(500).json({ message: `Error al limpiar carrito ${req}`, error: error.message })

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
        async (req, res) => {
            try {
                const carritoActualizado = await cartsManager.productInCart(req, res)
                res.status(200).json(carritoActualizado)
                return carritoActualizado
            } catch (error) {
                res.status(500).json({ message: "Error al agregar producto al carrito", error: error.message });
            }
        })
    .delete(
        async (req, res) => {
            try {
                const carritoActualizado = await cartsManager.removeProductFromCart(req, res)
                res.status(200).json({ message: "Producto Eliminado del carrito", carrito: carritoActualizado })
                return carritoActualizado
            } catch (error) {
                res.status(500).json({ message: "Error al eliminar producto del carrito", error: error.message });

            }
        }
    )
    .put(
        async (req, res) => {
            try {
                const carritoModificado = await cartsManager.updateProductQuantity(req, res)
                if(!carritoModificado)return res.status(400).json({status: sucess, message:"No se puede actualizar el carrito"})
                
                return res.status(200).json({ message: "Cantidad actualizada en el carrito", carrito: carritoModificado })
                } catch (error) {
                res.status(500).json({ message: "Error al actualizar el carrito", error: error.message });

            }
        })



export default cartRouter