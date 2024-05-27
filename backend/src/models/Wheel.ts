import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Wheel extends Model {
    public WheelId!: number;
    public BrandId!: number;
    public PCCD!: string;
    public drivingMethodPCCD!: string | null;
    public productName!: string;
    public productCode!: string | null;
    public wheelSize!: string;
    public frontOffset!: string | null;
    public rearOffset!: string | null;
    public price!: number;
    public amount!: number;
    public discountRate!: number;
    public discountPrice!: number;
    public image!: string | null;
    public sales!: number | null;
    public viewers!: number | null;
    public feature!: string;
    public content!: string | null;
    public isSecond!: boolean;
    public isVisible!: boolean;
    public isActivate!: boolean;
    public isContinue!: boolean;
    public PCD!: string | null;
    public hole!: string | null;

    static initModel(sequelize: Sequelize) {
        return super.init({
            WheelId: {
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
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            drivingMethodPCCD: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            productCode: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ""
            },
            wheelSize: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: "" 
            },
            frontOffset: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            rearOffset: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            discountRate: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            discountPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            image: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            sales: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            viewers: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            feature: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            content: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },
            isSecond: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            isVisible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            isActivate: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            isContinue: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            PCD: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            hole: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Wheel',
            tableName: 'Wheels',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
