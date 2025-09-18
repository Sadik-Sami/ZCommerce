import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/products/product.routes';
import authRoutes from './routes/auth/auth.routes';
import userRoutes from './routes/users/user.routes';
import { errorHandler } from './middleware/errorHandler';
const port = 3000;
const app = express();

app.set('trust proxy', 1);
app.use(
	cors({
		origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
		credentials: true,
	})
);
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('api/users', userRoutes);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Zcommerce is listening on port ${port}`);
});
