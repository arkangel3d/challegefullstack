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
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            amountTotal: {
                type: DataTypes.DECIMAL,
                
            },
        }, {
            timestamps: false,
        });
}
module.exports = User;
