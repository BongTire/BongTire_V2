const Sequelize = require('sequelize');

module.exports = class ReservationMaster extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            ReservationMasterId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
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
            OwnCarId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            ReservationCode: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: 0
            },
            paymentMethod: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            request: {
                type: Sequelize.TEXT('tiny'),
                allowNull: true,
            },
            totalPrice: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            isCancel:{
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            isReceive:{
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            isComplete:{
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            name:{
                type: Sequelize.STRING(40),
                allowNull: true
            },
            number:{
                type: Sequelize.STRING(40),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'ReservationMaster',
            tableName: 'ReservationMasters', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
