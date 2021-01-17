const sequelize = require('./sequelize/_index');
const models = require('./sequelize/models/_index');
const express = require('express');
const app = express();
const router = express.Router();
const handler = require('./handlers/_index');
const port = 6969;
const Content = require('./sequelize/models/content.model');
const init = require('./handlers/init.handler')

const database = async () => {
  try {
    await sequelize.authenticate();
    console.info('Connection has been established successfully.');
    await sequelize.sync({force: true});
    await init();
    console.info('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

database();
router.use('/', handler);

app.use(router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);

});
