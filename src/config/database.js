import mongoose from "mongoose"

const connectToDDBB = async () => {

  try {
    const connectDDBB = mongoose.connect('mongodb+srv://pbuitron:pbuitron@backend.98juy.mongodb.net/Coder_database?retryWrites=true&w=majority&appName=Backend')
    console.log(`Mongo Connected:${(await connectDDBB).connection.host} `);
  } catch (error) {
    console.error('Error de conexión MongoDB:', error);
  }
}


export default connectToDDBB