const Sequelize = require('sequelize');

module.exports = class TireHashTagConnection extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            TireHashTagConnectionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            TireId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            BrandId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            HashTagId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            FilterId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'TireHashTagConnection',
            tableName: 'TireHashTagConnections', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
