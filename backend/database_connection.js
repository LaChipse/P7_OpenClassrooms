const Sequelize = require('sequelize');
  require('dotenv').config()

  const sequelize = new Sequelize('VCombOC', process.env.DB_NAME, process.env.DB_MDP, {
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
      operatorsAliases: false
  });


  sequelize.authenticate()
      .then(() => console.log('Connection has been established successfully.'))
      .catch((err) => console.log('Unable to connect to the database:', err));


  module.exports = sequelize;
  global.sequelize = sequelize;