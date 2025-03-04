import express from 'express';
import { engine } from 'express-handlebars';
import connectToDDBB from './config/database.js';
import productRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import viewRouter from './routes/views.routes.js';
import sessionRouter from './routes/sessions.routes.js';
import passport from './config/passport.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));
app.use(cookieParser());

connectToDDBB();

app.use(passport.initialize());


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);
app.use('/', viewRouter);
app.use('*', (req, res) => {
  res.status(404).render('404', { 
    title: 'Página no encontrada',
    path: '404' 
  });
});

// HANDLEBARS
app.engine('handlebars', engine({
  layoutsDir: 'src/views/layouts',
  partialsDir: 'src/views/partials',
}));
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));