import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Revenue extends Model {
    public RevenueId!: number;
    public year!: number;
    public month!: number;
    public revenue!: number | null;
    public onlinePayment!: number | null;
    public offlinePayment!: number | null;

    static initModel(sequelize: Sequelize) {
        return super.init({
            RevenueId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            month: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            revenue: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            onlinePayment: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            offlinePayment: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Revenue',
            tableName: 'Revenues',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
