import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Tire extends Model {
    public TireId!: number;
    public BrandId!: number;
    public PCCD!: string;
    public drivingMethodPCCD!: string | null;
    public mCode!: string | null;
    public productName!: string;
    public tireSize!: string;
    public price!: number;
    public amount!: number;
    public discountRate!: number;
    public discountPrice!: number;
    public image!: string;
    public patternCode!: string | null;
    public maxSpeed!: string | null;
    public maxWeight!: string | null;
    public origin!: string | null;
    public xl!: string | null;
    public ply!: number | null;
    public numberOfDataUpdate!: number;
    public sales!: number;
    public viewers!: number;
    public isSecond!: boolean;
    public content!: string | null;
    public feature!: string | null;
    public isActive!: boolean;
    public isVisible!: boolean;
    public isRecommanded!: boolean;

    static initModel(sequelize: Sequelize) {
        return super.init({
            TireId: {
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
            },
            drivingMethodPCCD: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            mCode: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tireSize: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'vat 별도로 저장된 금액',
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            discountRate: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            discountPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: '',
            },
            patternCode: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            maxSpeed: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            maxWeight: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            origin: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            xl: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ply: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            numberOfDataUpdate: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            sales: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            viewers: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            isSecond: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },
            feature: {
                type: DataTypes.TEXT('medium'),
                allowNull: true,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            isVisible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            isRecommanded: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Tire',
            tableName: 'Tires',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
