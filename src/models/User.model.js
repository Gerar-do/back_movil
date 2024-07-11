import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; // Ajusta la ruta según la ubicación de tu archivo database.js
import Role from './Role.model.js'; // Ajusta la ruta según la ubicación de tu archivo Role.model.js

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'User'
});

// Definir la relación uno a muchos entre User y Role
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

export default User;
