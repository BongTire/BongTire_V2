import { Model, DataTypes, Sequelize } from 'sequelize';

export default class TireHashTagConnection extends Model {
    public TireHashTagConnectionId!: number;
    public TireId!: number;
    public BrandId!: number;
    public HashTagId!: number;
    public FilterId!: number;

    static initModel(sequelize: Sequelize) {
        return super.init({
            TireHashTagConnectionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            TireId: {
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
            modelName: 'TireHashTagConnection',
            tableName: 'TireHashTagConnections',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
