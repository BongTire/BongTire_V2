const Sequelize = require('sequelize');

module.exports = class Product extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            ProductId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            BrandId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            productName: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: ""
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
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            discountRate: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            discountPrice: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            image: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ""
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
            feature: {
                type: Sequelize.TEXT('long'),
                allowNull: true,
            },
            isSecond: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            numberOfDataUpdate: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            isVisible: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            isContinue: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        }, {
            sequelize,
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'Product',
            tableName: 'Products', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
