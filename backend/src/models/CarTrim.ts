import { Model, DataTypes, Sequelize } from 'sequelize';

export default class CarTrim extends Model {
    public CarTrimId!: number;
    public CarId!: number;
    public BrandId!: number;
    public name!: string;
    public price!: number | null;
    public year!: number;
    public traction!: string | null;
    public combinedEfficiency!: string | null;
    public image!: string | null;
    public frontTireSize!: string;
    public rearTireSize!: string;
    public tireSizeOption!: string | null;
    public frontBrakeType!: string | null;
    public rearBrakeType!: string | null;
    public curbWeight!: string | null;

    static initModel(sequelize: Sequelize) {
        return super.init({
            CarTrimId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            CarId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            BrandId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ""
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            traction: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            combinedEfficiency: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: ""
            },
            frontTireSize: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            rearTireSize: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            tireSizeOption: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            frontBrakeType: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            rearBrakeType: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            curbWeight: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'CarTrim',
            tableName: 'Cartrims',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
