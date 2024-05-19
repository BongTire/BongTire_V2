const Sequelize = require('sequelize');

module.exports = class Menu extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            MenuId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            PageId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            sequence: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            upperMenu: {
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
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'Menu',
            tableName: 'Menus', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
