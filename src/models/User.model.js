import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; // Ajusta la ruta según la ubicación de tu archivo database.js
import Role from './Roles.model.js'; // Ajusta la ruta según la ubicación de tu archivo Role.model.js

import bcrypt from 'bcryptjs';


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
  tableName: 'User',
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Métodos estáticos
User.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

User.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

// Definir la relación uno a muchos entre User y Role
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

export default User;
