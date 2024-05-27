import { Model, DataTypes, Sequelize } from 'sequelize';

export default class OtherproductHashTagConnection extends Model {
    public OtherproductHashTagConnectionId!: number;
    public ProductId!: number;
    public BrandId!: number;
    public HashTagId!: number;
    public FilterId!: number;

    static initModel(sequelize: Sequelize) {
        return super.init({
            OtherproductHashTagConnectionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            ProductId: {
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
            modelName: 'OtherproductHashTagConnection',
            tableName: 'OtherproductHashTagConnections',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
