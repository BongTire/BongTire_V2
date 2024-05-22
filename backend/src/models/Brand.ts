import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Brand extends Model {
    public BrandId!: number;
    public name!: string;
    public codeName!: string;
    public PCCD!: string;
    public brandLogo!: string | null;
    public origin!: boolean;
    public nation!: string | null;

    static initModel(sequelize: Sequelize) {
        return super.init({
            BrandId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            codeName: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            PCCD: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            brandLogo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            origin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            nation: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Brand',
            tableName: 'Brands',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
