import { Model, DataTypes, Sequelize } from 'sequelize';

class Post extends Model {
    public PostId!: number;
    public UserId!: number;
    public PTCD!: string;
    public PCCD!: string;
    public title!: string;
    public content!: string | null;
    public name!: string | null;
    public number!: string | null;
    public isThumbnail!: boolean;
    public thumbnail!: string;
    public isMainPost!: boolean;
    public isPin!: boolean;
    public isActive!: boolean;
    public isAnswer!: boolean | null;
    public answer!: string | null;
    public viewers!: number;
    public isSecret!: boolean;

    static initModel(sequelize: Sequelize) {
        return Post.init({
            PostId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            PTCD: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            PCCD: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            title: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
            content: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            number: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            isThumbnail: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            thumbnail: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ""
            },
            isMainPost: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            isPin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            isAnswer: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            answer: {
                type: DataTypes.TEXT('medium'),
                allowNull: true,
            },
            viewers: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            isSecret: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        }, {
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
export default Post 
