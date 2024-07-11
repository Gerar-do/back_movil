import Imagen from '../models/imagen.model.js';
import * as fs from 'fs';

// Función para obtener imágenes
export const getImagenes = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = (id) ? await Imagen.findByPk(id) : await Imagen.findAll();
    
    if (!rows) {
      return res.status(404).json({ status: false, errors: ['Imagen no encontrada'] });
    }

    return res.status(200).json({ status: true, data: rows });
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
    return res.status(500).json({ status: false, errors: [error.message] });
  }
};

// Las demás funciones saveImagenes, updateImagenes, deleteImagen siguen igual

// Función para guardar imágenes
export const saveImagenes = async (req, res) => {
  try {
    const { nombre, texto } = req.body;
    const validacion = validar(nombre, texto, req.file, 'Y');
    if (validacion.length === 0) {
      const nuevaImagen = await Imagen.create({
        nombre,
        texto,
        imagen: req.file ? '/uploads/' + req.file.filename : null
      });
      return res.status(200).json({ status: true, message: 'Se ha publicado' });
    } else {
      return res.status(400).json({ status: false, errors: validacion });
    }
  } catch (error) {
    console.error("Error al guardar imagen:", error);
    return res.status(500).json({ status: false, errors: [error.message] });
  }
};

// Función para actualizar imágenes
export const updateImagenes = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, texto } = req.body;
    let imagen = '';
    let valores = { nombre, texto };
    if (req.file != null) {
      imagen = '/uploads/' + req.file.filename;
      valores.imagen = imagen;
    }
    const validacion = validar(nombre, texto);
    if (validacion.length === 0) {
      await Imagen.update(valores, { where: { id } });
      return res.status(200).json({ status: true, message: 'Imagen actualizada' });
    } else {
      return res.status(400).json({ status: false, errors: validacion });
    }
  } catch (error) {
    console.error("Error al actualizar imagen:", error);
    return res.status(500).json({ status: false, errors: [error.message] });
  }
};

// Función para eliminar imágenes
export const deleteImagen = async (req, res) => {
  try {
    const { id } = req.params;
    await Imagen.destroy({ where: { id } });
    return res.status(200).json({ status: true, message: 'Imagen eliminada' });
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    return res.status(500).json({ status: false, errors: [error.message] });
  }
};

// Función de validación
const validar = (nombre, texto, img, seValida) => {
  var errors = [];
  if (nombre === undefined || nombre.trim() === '') {
    errors.push('El nombre no debe estar vacío');
  }
  if (texto === undefined || texto.trim() === '') {
    errors.push('El texto no debe estar vacío');
  }

  if (seValida === 'Y' && (img === undefined || !(img.mimetype === 'image/jpeg' || img.mimetype === 'image/png'))) {
    errors.push('Selecciona un archivo en formato jpg o png');
  }
  // Asumiendo que quieres eliminar el archivo solo si hay errores
  if (errors.length > 0 && img) {
    try {
      fs.unlinkSync('./public/uploads/' + img.filename); // Asegúrate de que la ruta sea correcta
    } catch (error) {
      console.error("Error eliminando el archivo:", error.message);
    }
  }
  return errors;
};
