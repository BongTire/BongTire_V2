import { Model, DataTypes, Sequelize } from 'sequelize';

export default class ReservationTime extends Model {
    public ReservationTimeId!: number;
    public CalendarId!: number;
    public OperationTimeId!: number;
    public startTime!: number;
    public endTime!: number;
    public numberOfReservation!: number;
    public availableNumberOfReservation!: number;
    public salesThisTime!: number | null;
    public reservationPossible!: boolean;

    static initModel(sequelize: Sequelize) {
        return super.init({
            ReservationTimeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            CalendarId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            OperationTimeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            startTime: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            endTime: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            numberOfReservation: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            availableNumberOfReservation: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            salesThisTime: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            reservationPossible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'ReservationTime',
            tableName: 'ReservationTimes',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
