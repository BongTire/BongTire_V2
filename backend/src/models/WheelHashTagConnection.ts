import { Model, DataTypes, Sequelize } from 'sequelize';

export default class WheelHashTagConnection extends Model {
    public WheelHashTagConnectionId!: number;
    public WheelId!: number;
    public BrandId!: number;
    public HashTagId!: number;
    public FilterId!: number;

    static initModel(sequelize: Sequelize) {
        return super.init({
            WheelHashTagConnectionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            WheelId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            BrandId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            HashTagId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            FilterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'WheelHashTagConnection',
            tableName: 'WheelHashTagConnections',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
