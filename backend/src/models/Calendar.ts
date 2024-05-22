import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Calendar extends Model {
    public CalendarId!: number;
    public OperationTimeId!: number;
    public year!: number;
    public month!: number;
    public week!: number | null;
    public day!: number;
    public dayOfWeek!: string;
    public isHoliday!: boolean;
    public holidayName!: string | null;
    public totalPrice!: number | null;
    public reservationPossible!: boolean | null;

    static initModel(sequelize: Sequelize) {
        return super.init({
            CalendarId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            OperationTimeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            month: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            week: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            day: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            dayOfWeek: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
            isHoliday: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            holidayName: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            totalPrice: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            reservationPossible: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Calendar',
            tableName: 'Calendars',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
