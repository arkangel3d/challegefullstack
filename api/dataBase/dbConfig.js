const { Sequelize } = require('sequelize');
require('dotenv').config();
const {UserModel, TransactionModel, CategoryModel} = require('../models/index');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false, 
    native: false, 
  });

sequelize
.authenticate()
.then(() => {
  console.log("Connection has been established successfully.");
})
.catch((err) => {
  console.error("Unable to connect to the database:", err);
});
UserModel(sequelize);
TransactionModel(sequelize);
CategoryModel(sequelize);

const { User, Transsaction  } = sequelize.models;

User.belongsToMany(Transsaction,  {through : 'UserTranssaction'});
Transsaction.belongsTo(User);

module.exports = sequelize; 