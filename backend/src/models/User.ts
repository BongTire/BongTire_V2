import { Model, DataTypes, Sequelize } from 'sequelize';

export default class User extends Model {
    public UserId!: number;
    public authorization!: number;
    public name!: string;
    public number!: string;
    public email!: string;
    public platform!: string;
    public isBlack!: boolean;
    public grade!: number;
    public address!: string;
    public snsId!: string;
    public password!: string;

    static initModel(sequelize: Sequelize) {
        return super.init({
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            authorization: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            number: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: "0" // defaultValue should be string as per definition
            },
            email: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            platform: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            isBlack: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            grade: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            address: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
            snsId: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

        }, {
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
