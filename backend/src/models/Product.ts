import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Product extends Model {
    public ProductId!: number;
    public BrandId!: number;
    public productName!: string;
    public PCCD!: string;
    public drivingMethodPCCD!: string | null;
    public price!: number;
    public discountRate!: number | null;
    public discountPrice!: number;
    public amount!: number;
    public image!: string;
    public sales!: number;
    public viewers!: number;
    public feature!: string | null;
    public isSecond!: boolean;
    public numberOfDataUpdate!: number;
    public isVisible!: boolean;
    public isActive!: boolean;
    public isContinue!: boolean;

    static initModel(sequelize: Sequelize) {
        return super.init({
            ProductId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            BrandId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: ""
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
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            discountRate: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            discountPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            sales: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            viewers: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            feature: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },
            isSecond: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            numberOfDataUpdate: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            isVisible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            isContinue: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Product',
            tableName: 'Products',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
