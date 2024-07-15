import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Cargar variables de entorno desde el archivo .env

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT
});

// Prueba de conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida exitosamente.');
  })
  .catch(err => {
    console.error('No se puede conectar a la base de datos:', err);
  });

export default sequelize;
