const routes = require('./routes/routes');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const app = express();
const port = 3200;
const seedUsers = require('./db/seeders/20230528023514-users');
const seedCoins = require('./db/seeders/20230529020923-coin');
const seedUserCoins = require('./db/seeders/20230529032125-userCoins');


const errorMiddleware = function(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
};

app.use(express.urlencoded({ extended: true }));
//CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.json());
app.use(errorMiddleware);
app.use(express.static('../frontend/build'));
app.use(helmet());
app.use(compression());

// Rutas de la API
routes(app);

// Ruta de fallback para enrutar todas las demás solicitudes a tu aplicación React
const db = require('./db/models');

try{
  db.sequelize.sync().then(async () => {
      console.log('Drop and resync db');
      await seedUsers.up(db.sequelize.getQueryInterface(), db.Sequelize);
      await seedCoins.up(db.sequelize.getQueryInterface(), db.Sequelize);
      await seedUserCoins.up(db.sequelize.getQueryInterface(), db.Sequelize);
  
      app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
      });
  })
} catch (error) {
  console.log(error);
}

