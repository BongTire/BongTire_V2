const Sequelize = require('sequelize');

module.exports = class Wheel extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            WheelId: {
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
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            drivingMethodPCCD: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            productName: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ""
            },
            productCode:{
                type: Sequelize.STRING(50),
                allowNull: true,
                defaultValue: ""
            },
            wheelSize: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: 0
            },
            frontOffset:{
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            rearOffset:{
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            discountRate: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            discountPrice: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            image: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            sales: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            viewers: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            feature: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ""
            },
            content: {
                type: Sequelize.TEXT('long'),
                allowNull: true,
            },
            feature: {
                type: Sequelize.TEXT('medium'),
                allowNull: true,
            },
            isSecond: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            isVisible: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            isActivate: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            isContinue: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            PCD: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            hole: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'Wheel',
            tableName: 'Wheels', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
