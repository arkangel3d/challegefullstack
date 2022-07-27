const { DataTypes, } = require('sequelize');

const Transsaction = (sequelize)=>{
    sequelize.define('Transsaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
        },{
            timestamps: false,
        });
};
module.exports = Transsaction;