const Sequelize = require('sequelize');

module.exports = class Page extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            PageId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            componentName: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            PTCD: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            PCCD: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
        }, {
            sequelize,
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'Page',
            tableName: 'Pages', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
