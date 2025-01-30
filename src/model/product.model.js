import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


 const producto = new Schema (
 {
    title:{
        type: String,
        
         
    },
    description: {
        type: String,
       
    },
    code: {
        type: String,
       
        unique: true
    },
    price: {
        type: Number,
        
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        
    },
    category: {
        type: String,
        
    },
    thumbnails : {
        type: String,
    }
    }

 )

 producto.plugin(mongoosePaginate)

 const Product = model('products', producto)

 export default Product