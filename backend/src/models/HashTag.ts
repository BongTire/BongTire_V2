import { Model, DataTypes, Sequelize } from 'sequelize';

export default class HashTag extends Model {
    public HashTagId!: number;
    public FilterID!: number;
    public name!: string;
    public PCCD!: string;

    static initModel(sequelize: Sequelize) {
        return super.init({
            HashTagId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            FilterID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            PCCD: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'HashTag',
            tableName: 'HashTags',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
