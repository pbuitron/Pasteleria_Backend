import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const connectToDDBB = async () => {

  try {
    const connectDDBB = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Backend`)
    console.log(`Mongo Connected:${(await connectDDBB).connection.host} `);
  } catch (error) {
    console.error('Error de conexión MongoDB:', error);
  }
}


export default connectToDDBB