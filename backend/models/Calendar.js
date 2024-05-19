const Sequelize = require('sequelize');

module.exports = class Calendar extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            CalendarId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,

            },
            OperationTimeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            year: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            month: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            week: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            day: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            dayOfWeek: {//요일
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
            isHoliday: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue:false
            },
            holidayName: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            totalPrice: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            reservationPossible: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'Calendar',
            tableName: 'Calendars', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
