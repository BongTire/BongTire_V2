const Sequelize = require('sequelize');

module.exports = class Tire extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            TireId: {
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
            },
            drivingMethodPCCD: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            mCode: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            productName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            tireSize: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'vat 별도로 저장된 금액',
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
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ""
            },
            patternCode: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            maxSpeed: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            maxWeight: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            origin: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            xl: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            ply: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            numberOfDataUpdate: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            sales: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            viewers: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            isSecond: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT('long'),
                allowNull: true,
            },
            feature: {
                type: Sequelize.TEXT('medium'),
                allowNull: true,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            isVisible: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            isRecommanded: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        }, {
            sequelize,
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'Tire',
            tableName: 'Tires', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
