const Sequelize = require('sequelize');

module.exports = class ReservationTime extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            ReservationTimeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            CalendarId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            OperationTimeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            startTime: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            endTime: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            numberOfReservation: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            availableNumberOfReservation: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            salesThisTime: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            reservationPossible: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
        }, {
            sequelize,
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'ReservationTime',
            tableName: 'ReservationTimes', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
