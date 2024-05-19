const Sequelize = require('sequelize');

module.exports = class Filter extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            FilterId: { 
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            PCCD:{
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            FliterPCCD: { 
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            name: { 
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
            isBrand: { 
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            isDrivingMethod: { 
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Filter',
            tableName: 'Filters',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
