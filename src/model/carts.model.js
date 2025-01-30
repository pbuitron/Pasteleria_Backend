import {Schema, model} from "mongoose";
import Product from "./product.model";

const cart = new Schema({

    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product' },
            quantity: { type: Number, 
                required: true }
        }
    ]
})

const Cart = model('carts', cart)

export default Cart