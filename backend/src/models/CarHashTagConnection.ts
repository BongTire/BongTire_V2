import { Model, DataTypes, Sequelize } from 'sequelize';

export default class CarHashTagConnection extends Model {
    public CarHashTagConnectionId!: number;
    public HashTagId!: number;
    public CarId!: number;
    public BrandId!: number;
    public FilterId!: number;

    static initModel(sequelize: Sequelize) {
        return super.init({
            CarHashTagConnectionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            HashTagId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            CarId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            BrandId: {
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
            modelName: 'CarHashTagConnection',
            tableName: 'CarHashTagConnections',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
