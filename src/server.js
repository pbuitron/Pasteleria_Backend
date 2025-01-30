import  express from 'express'

import { engine } from 'express-handlebars'
import connectToDDBB from './config/database.js'
import productRouter from './routes/products.routes.js'
import viewRouter from './routes/views.routes.js'



const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('src/public'))

//connectToDatabase()
connectToDDBB()

app.use('/api/products', productRouter)
app.use('/', viewRouter)




//HANDLEBARS
app.engine('handlebars', engine({
    
    layoutsDir: 'src/views/layouts',
    partialsDir: 'src/views/partials',
}));
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

app.listen(PORT, ()=>console.log(`Servidor corriendo en http://localhost:${PORT}`))


