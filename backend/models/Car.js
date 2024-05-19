const Sequelize = require('sequelize');

module.exports = class Car extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            CarId: { 
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            BrandId: { 
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            PCCD: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ""
            },
            drivingMethodPCCD: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            codeName: {
                type: Sequelize.STRING(30),
                allowNull: true,
                defaultValue: ""
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            powerTrain: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            displacement: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: ""
            },
            year: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Car',
            tableName: 'Cars',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
