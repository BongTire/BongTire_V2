const Sequelize = require('sequelize');

module.exports = class OwnCar extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            OwnCarId: { 
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            CarId: { 
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            BrandId: { 
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            UserId: { 
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            carNumber: { 
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            PCCD: { 
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            isRepresent: { 
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'OwnCar',
            tableName: 'Owncars',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
