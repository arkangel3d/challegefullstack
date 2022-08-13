const { DataTypes } = require('sequelize');

const Transsaction = (sequelize)=>{
    sequelize.define('Transsaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.ENUM('income', 'expense'),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            default: new Date(),
        }
        },{
            timestamps: false,
        });
};
module.exports = Transsaction;