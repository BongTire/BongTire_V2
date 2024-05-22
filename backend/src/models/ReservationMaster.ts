import { Model, DataTypes, Sequelize } from 'sequelize';

export default class ReservationMaster extends Model {
    public ReservationMasterId!: number;
    public ReservationTimeId!: number;
    public CalendarId!: number;
    public OperationTimeId!: number;
    public UserId!: number;
    public OwnCarId!: number | null;
    public ReservationCode!: string;
    public paymentMethod!: string;
    public request!: string | null;
    public totalPrice!: number;
    public isCancel!: boolean;
    public isReceive!: boolean;
    public isComplete!: boolean;
    public name!: string | null;
    public number!: string | null;

    static initModel(sequelize: Sequelize) {
        return super.init({
            ReservationMasterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
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
            OwnCarId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            ReservationCode: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: '0', // Changed defaultValue to string '0' to match the type
            },
            paymentMethod: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: "",
            },
            request: {
                type: DataTypes.TEXT('tiny'),
                allowNull: true,
            },
            totalPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            isCancel: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            isReceive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            isComplete: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            name: {
                type: DataTypes.STRING(40),
                allowNull: true,
            },
            number: {
                type: DataTypes.STRING(40),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'ReservationMaster',
            tableName: 'ReservationMasters',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
