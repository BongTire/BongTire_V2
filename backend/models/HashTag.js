const Sequelize = require('sequelize');

module.exports = class HashTag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            HashTagId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            FilterID: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            PCCD: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
        }, {
            sequelize,
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'HashTag',
            tableName: 'HashTags', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
