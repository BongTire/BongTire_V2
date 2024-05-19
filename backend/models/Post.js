const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            PostId:{
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true
            },
            UserId:{
                type: Sequelize.INTEGER,
                allowNull: false,
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
            title: { 
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
            content: { 
                type: Sequelize.TEXT('long'),
                allowNull: true,
            },
            name:{
                type: Sequelize.STRING,
                allowNull: true,
            },
            number:{
                type: Sequelize.STRING,
                allowNull: true,
            },
            isThumbnail: { 
                type: Sequelize.BOOLEAN, 
                allowNull: false,
                defaultValue: false
            },
            thumbnail: {
                type: Sequelize.STRING(255), //string 형식으로 사진 주소
                allowNull: false,
                defaultValue: ""
            },
            isMainPost:{
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            isPin: { 
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            isActive: { 
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            isAnswer: { 
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            answer: { 
                type: Sequelize.TEXT('medium'),
                allowNull: true,
            },
            viewers: { 
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            isSecret: { 
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'Posts',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
