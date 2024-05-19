const Sequelize = require('sequelize');

module.exports = class PTCD extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            PTCDId:{
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            menuTypeName:{
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            menuTypeCode:{
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            pageTypeName:{
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            PTCD:{
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'PTCD',
            tableName: 'PTCDs',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    
}