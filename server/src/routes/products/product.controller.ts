import { Request, Response, NextFunction } from 'express';
import { productServices } from './product.service';

export const productController = {
	async list(req: Request, res: Response, next: NextFunction) {
		try {
			const products = await productServices.getAll();
			res.json(products);
		} catch (error) {
			next(error);
		}
	},
	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const id: string = req.params.id;
			const product = await productServices.getById(id);
			if (!product) return res.status(404).json({ message: 'Product not found' });
			res.json(product);
		} catch (error) {
			next(error);
		}
	},
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const product = await productServices.create(req.body);
			res.status(201).json({ message: 'Product created', product });
		} catch (err) {
			next(err);
		}
	},
	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const id: string = req.params.id;
			const product = await productServices.update(id, req.body);
			res.json({ message: 'Product updated', product });
		} catch (err) {
			next(err);
		}
	},
	async remove(req: Request, res: Response, next: NextFunction) {
		try {
			const id: string = req.params.id;
			console.log(id);
			const found = await productServices.getById(id);
			console.log(found)
			const product = await productServices.delete(id);
			res.json({ message: 'Product deleted', product });
		} catch (err) {
			next(err);
		}
	},
};
