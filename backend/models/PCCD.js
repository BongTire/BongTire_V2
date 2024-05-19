const Sequelize = require('sequelize');

module.exports = class PCCD extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            PCCDId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            firstName: {//한글
                type: Sequelize.STRING(255),
                allowNull: false,
                defaultValue: ""
            },
            firstCodeName: {//영어
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            secondName: {//한글
                type: Sequelize.STRING(255),
                allowNull: false,
                defaultValue: ""
            },
            secondCodeName: {//영어
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            PCCD: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            icon: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'PCCD',
            tableName: 'PCCDs', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
