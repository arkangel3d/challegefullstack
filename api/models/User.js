const { NUMBER } = require('sequelize');
const { FLOAT } = require('sequelize');
const { DataTypes } = require('sequelize');

const User = (sequelize)=>{
    sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                
            },
            lastName: {
                type: DataTypes.STRING,
           
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false, 
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            balance: {
                type: DataTypes.STRING,
                defaultValue : '0.00'
                
            },
        }, {
            timestamps: false,
        });
}
module.exports = User;
