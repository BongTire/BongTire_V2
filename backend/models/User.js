const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            UserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true,
            },
            authorization: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            number: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: 0
            },
            email: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            platform: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            isBlack: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            grade: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            address: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
            snsId:{ //kakao에서 넘어오는 아이디
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: ""
                
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'Users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    
}