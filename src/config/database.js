import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()


const dbUser  = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;


const connectToDDBB = async () => {

  try {
    const connectDDBB = mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=Backend`)
    console.log(`Mongo Connected:${(await connectDDBB).connection.host} `);
  } catch (error) {
    console.error('Error de conexión MongoDB:', error);
  }
}


export default connectToDDBB