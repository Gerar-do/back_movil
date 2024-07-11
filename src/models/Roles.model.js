import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; 

// Definir el modelo Role
const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Otras opciones del modelo
    timestamps: false,  // Desactivar timestamps si no se requieren
    version: false      // Desactivar versionKey
});

export default Role;