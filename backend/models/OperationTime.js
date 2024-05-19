const Sequelize = require('sequelize');

module.exports = class OperationTime extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            OperationTimeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
               
            },
            name: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            type: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
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
            reservationInterval: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            reservationTime: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        }, {
            sequelize,
            timestamps: true, 
            underscored: false,
            modelName: 'OperationTime',
            tableName: 'OperationTimes',
            paranoid: true, 
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
