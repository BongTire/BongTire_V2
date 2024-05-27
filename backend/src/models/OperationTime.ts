import { Model, DataTypes, Sequelize } from 'sequelize';

export default class OperationTime extends Model {
    public OperationTimeId!: number;
    public name!: string;
    public type!: number;
    public startTime!: number;
    public endTime!: number;
    public reservationInterval!: number;
    public reservationTime!: number;
    public isActive!: boolean;

    static initModel(sequelize: Sequelize) {
        return super.init({
            OperationTimeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            startTime: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            endTime: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            reservationInterval: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            reservationTime: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'OperationTime',
            tableName: 'OperationTimes',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
