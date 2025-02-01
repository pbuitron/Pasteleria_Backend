import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


 const producto = new Schema (
 {
    title:{
        type: String,
        required: true
        
         
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique:true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
        
    },
    category: {
        type: String,
        required: true
    },
    thumbnails : {
        type: String
    }
}, { timestamps: true }

 )

 producto.plugin(mongoosePaginate)

 const Product = model('products', producto)

 export default Product