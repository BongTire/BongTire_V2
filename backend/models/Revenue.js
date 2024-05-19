const Sequelize = require('sequelize');

module.exports = class Revenue extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            RevenueId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
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
            revenue: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            onlinePayment: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            offlinePayment: {
                type: Sequelize.INTEGER,
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'Revenue',
            tableName: 'Revenues', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
