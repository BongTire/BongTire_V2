import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Page extends Model {
    public PageId!: number;
    public name!: string;
    public componentName!: string;
    public PTCD!: string;
    public PCCD!: string;

    static initModel(sequelize: Sequelize) {
        return super.init({
            PageId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            componentName: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            PTCD: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            PCCD: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Page',
            tableName: 'Pages',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
