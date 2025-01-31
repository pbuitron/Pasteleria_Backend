import {Schema, model} from "mongoose";
import Product from "./product.model";

const cart = new Schema({

    products: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product',
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

const Cart = model('carts', cart)

export default Cart