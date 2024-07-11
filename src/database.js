import { Sequelize } from 'sequelize';

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('movil', 'root', '211228', {
  host: 'localhost',
  dialect: 'mysql'
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
