import { Router } from 'express';
import multer from 'multer';
import { getImagenes, saveImagenes, updateImagenes, deleteImagen } from '../controllers/publications.controller.js';

const router = Router();
const subirImagen = multer({ dest: 'public/uploads/' });

router.get('/imagenes/all', getImagenes);
router.get('/imagenes/:id', getImagenes)
router.post('/imagenes', subirImagen.single('imagen'), saveImagenes);
router.put('/imagenes/:id', subirImagen.single('imagen'), updateImagenes);
router.delete('/imagenes/:id', deleteImagen);

export default router;
