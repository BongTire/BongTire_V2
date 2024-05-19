const Sequelize = require('sequelize');

module.exports = class ReservationProduct extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            ReservationProductId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            ReservationMasterId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            ReservationTimeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            CalendarId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            OperationTimeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            UserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            ReservationCode: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            PCCD: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            ProductId: {//PCCD+ReservationProductId
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            tireLocation: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            laborCost: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'ReservationProduct',
            tableName: 'ReservationProducts', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
