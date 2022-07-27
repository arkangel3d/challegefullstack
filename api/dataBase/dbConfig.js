const { Sequelize } = require('sequelize');
require('dotenv').config();
const userM = require('../models/User');
const transsactionM = require('../models/Transsaction');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  });

sequelize
.authenticate()
.then(() => {
  console.log("Connection has been established successfully.");
})
.catch((err) => {
  console.error("Unable to connect to the database:", err);
});
userM(sequelize);
transsactionM(sequelize);

const { User, Transsaction  } = sequelize.models;

Transsaction.hasOne(User);
User.belongsToMany(Transsaction,  {through : 'UserTranssaction'});
module.exports = sequelize; 