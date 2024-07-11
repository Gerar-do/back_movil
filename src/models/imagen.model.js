import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; // Ajusta la ruta según la ubicación de tu archivo database.js

const Imagen = sequelize.define('Imagen', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  texto: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  
}, {
  timestamps: true,
  tableName: 'imagenes'
});

export default Imagen;


