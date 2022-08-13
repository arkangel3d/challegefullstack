const { DataTypes } = require('sequelize');

const Category = (sequelize)=>{
    sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('income', 'expense'),
            allowNull: false
        },
        
        description:{
            type: DataTypes.STRING,
        }
        },{
            timestamps: false,
        });
};
module.exports = Category;