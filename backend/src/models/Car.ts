import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Car extends Model {
    public CarId!: number;
    public BrandId!: number;
    public PCCD!: string;
    public drivingMethodPCCD!: string | null;
    public codeName!: string;
    public name!: string;
    public powerTrain!: string | null;
    public displacement!: number | null;
    public image!: string | null;
    public year!: number;

    static initModel(sequelize: Sequelize) {
        return super.init({
            CarId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            BrandId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            PCCD: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            drivingMethodPCCD: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            codeName: {
                type: DataTypes.STRING(30),
                allowNull: true,
                defaultValue: ""
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            powerTrain: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            displacement: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: ""
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Car',
            tableName: 'Cars',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
