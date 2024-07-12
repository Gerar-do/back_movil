import express from 'express';
import morgan from 'morgan';
import sequelize from './database.js'; // Asegúrate de que la ruta es correcta
import publicationsRoutes from './routes/publications.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json()); // Para poder parsear JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); // Para poder parsear formularios
app.use(express.static('public'));

// Usar rutas
app.use('/api/publications', publicationsRoutes);
app.use('/api/auth', authRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json('welcome');
});

// Sincronización de los modelos y conexión a la base de datos
sequelize.sync()
  .then(() => {
    console.log('Base de datos y tablas creadas');
    // Iniciar el servidor solo después de que la base de datos esté sincronizada
    app.listen(4000, () => {
      console.log('Server running on port 4000');
    });
  })
  .catch(error => {
    console.error('Error sincronizando la base de datos:', error);
  });
