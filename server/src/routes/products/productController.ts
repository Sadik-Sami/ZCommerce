import { Request, Response } from 'express';
import { db } from '../../db/index';
import { productsTable } from '../../db/schema/productsSchema';

export function listProducts(req: Request, res: Response) {
	res.send('All products');
}
export function getProductById(req: Request, res: Response) {
	res.send('getProductById');
}
export async function createProduct(req: Request, res: Response) {
	try {
		const insertedProduct = await db
			.insert(productsTable)
			.values(req.body)
			.returning({ id: productsTable.id, name: productsTable.name });
		res.status(201).json({ message: 'Product added successfully', product: insertedProduct });
	} catch (error) {
		res.status(500).send(error);
	}
}
export function updateProduct(req: Request, res: Response) {
	res.send('updateProduct');
}
export function deleteProduct(req: Request, res: Response) {
	res.send('deleteProduct');
}
