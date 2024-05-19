const Sequelize = require('sequelize');

module.exports = class Brand extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            BrandId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            codeName:{
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            PCCD:{
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ""
            },
            brandLogo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            origin: {//true-국산, false-수입
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            nation: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true, // Set to true if you want timestamps
            underscored: false,
            modelName: 'Brand',
            tableName: 'Brands', // Adjust the table name if needed
            paranoid: true, // Set to true if you want soft deletes
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
