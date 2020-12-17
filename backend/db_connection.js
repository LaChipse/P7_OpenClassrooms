const Sequelize = require('sequelize');
  require('dotenv').config()

  const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
  });


  sequelize.authenticate()
      .then(() => console.log('Connection has been established successfully.'))
      .catch((err) => console.log('Unable to connect to the database:', err));


  module.exports = sequelize;