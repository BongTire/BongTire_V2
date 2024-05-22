import { Model, DataTypes, Sequelize } from 'sequelize';

export default class PCCDBrandConnectionTable extends Model {
    public PCCDBrandConnectionTableId!: number;
    public PCCDId!: number;
    public BrandId!: number;

    static initModel(sequelize: Sequelize) {
        return super.init({
            PCCDBrandConnectionTableId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            PCCDId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            BrandId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'PCCDBrandConnectionTable',
            tableName: 'PCCDBrandConnectionTables',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
