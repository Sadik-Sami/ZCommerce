import { Request, Response, NextFunction } from 'express';
import { productServices } from './product.service';

export const productController = {
	async list(req: Request, res: Response, next: NextFunction) {
		try {
			const products = await productServices.getAll();
			res.status(200).json({ success: true, products });
		} catch (error) {
			next(error);
		}
	},
	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const id: string = req.params.id;

			const product = await productServices.getById(id);
			if (!product) return res.status(404).json({ message: 'Product not found' });

			res.status(200).json({ success: true, product });
		} catch (error) {
			next(error);
		}
	},
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const product = await productServices.create(req.body);
			res.status(201).json({ success: true, message: 'Product created', product });
		} catch (err) {
			next(err);
		}
	},
	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const id: string = req.params.id;

			const existing = await productServices.getById(id);
			if (!existing) return res.status(404).json({ success: false, message: 'Product not found' });

			const product = await productServices.update(id, req.body);
			res.status(201).json({ success: true, message: `${product?.name} updated successfully`, product });
		} catch (err) {
			next(err);
		}
	},
	async remove(req: Request, res: Response, next: NextFunction) {
		try {
			const id: string = req.params.id;

			const existing = await productServices.getById(id);
			if (!existing) return res.status(404).json({ success: false, message: 'Product not found' });

			const product = await productServices.delete(id);
			res.status(204).json({ success: true, message: `${product?.name || 'Product'} deleted successfully` });
		} catch (err) {
			next(err);
		}
	},
};
