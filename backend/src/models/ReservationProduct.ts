import { Model, DataTypes, Sequelize } from 'sequelize';

export default class ReservationProduct extends Model {
    public ReservationProductId!: number;
    public ReservationMasterId!: number;
    public ReservationTimeId!: number;
    public CalendarId!: number;
    public OperationTimeId!: number;
    public UserId!: number;
    public ReservationCode!: string;
    public PCCD!: string;
    public ProductId!: string;
    public amount!: number;
    public price!: number;
    public tireLocation!: string | null;
    public laborCost!: number | null;

    static initModel(sequelize: Sequelize) {
        return super.init({
            ReservationProductId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            ReservationMasterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ReservationTimeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            CalendarId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            OperationTimeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ReservationCode: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: "",
            },
            PCCD: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: "",
            },
            ProductId: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: "",
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            tireLocation: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            laborCost: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'ReservationProduct',
            tableName: 'ReservationProducts',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
