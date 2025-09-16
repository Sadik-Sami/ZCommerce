import express, { json, urlencoded } from 'express';
import productRoutes from './routes/products/product.routes';
import authRoutes from './routes/auth/auth.routes';
import { errorHandler } from './middleware/errorHandler';
const port = 3000;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Zcommerce is listening on port ${port}`);
});
