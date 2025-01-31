import {Schema, model} from "mongoose";
import mongoose from "mongoose";
//import Product from "./product.model.js";

const cartSchema = new Schema({

    products: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'products',
                required: true },
            quantity: { 
                type: Number, 
                required: true,
                default:1,
                min:1
             }
        }
    ]
}, { timestamps: true })

const Cart = model('carts', cartSchema)

export default Cart