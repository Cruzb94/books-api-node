const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const sequelize = new Sequelize(
    config.dbName,
    config.dbUser,
    config.dbPassword,
    {
        host: config.dbHost,
        dialect: 'postgres',
    }
);

// Comprobación de conexión a la base de datos
async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente con la base de datos.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}

// Ejecutar la comprobación de conexión
testDatabaseConnection();

// Sincronización de modelos con la base de datos (solo para propósitos de desarrollo)
sequelize.sync()
    .then(() => {
        console.log('Modelos sincronizados correctamente con la base de datos.');
    })
    .catch(err => {
        console.error('Error al sincronizar modelos con la base de datos:', err);
    });

// Inicialización de los modelos
setupModels(sequelize);

module.exports = sequelize;