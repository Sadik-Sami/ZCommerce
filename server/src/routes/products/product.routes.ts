import { Router } from 'express';
import { productController } from './product.controller';
import { validateData } from '../../middleware/validationMiddleware';
import { productInsertSchema } from '../../db/schema/product.validation';

const router = Router();

router.get('/', productController.list);
router.get('/:id', productController.getById);
router.post('/', validateData(productInsertSchema), productController.create);
router.put('/:id', validateData(productInsertSchema.partial()), productController.update);
router.delete('/:id', productController.remove);
export default router;
