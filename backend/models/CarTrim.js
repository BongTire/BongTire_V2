const Sequelize = require('sequelize');

module.exports = class CarTrim extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            CarTrimId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            CarId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            BrandId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
                defaultValue: ""
            },
            price:{
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            year:{
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue:0
            },
            traction: { 
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            combinedEfficiency: { 
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: ""
            },
            frontTireSize: { 
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            rearTireSize: { 
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            tireSizeOption:{
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            frontBrackeType: { 
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            rearBrackeType: { 
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            curbWeight: { 
                type: Sequelize.STRING(20),
                allowNull: true,
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'CarTrim',
            tableName: 'Cartrims',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
