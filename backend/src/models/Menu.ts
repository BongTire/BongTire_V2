import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Menu extends Model {
    public MenuId!: number;
    public PageId!: number;
    public name!: string;
    public sequence!: number;
    public upperMenu!: number;
    public isActive!: boolean;

    static initModel(sequelize: Sequelize) {
        return super.init({
            MenuId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            PageId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            sequence: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            upperMenu: {
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
            modelName: 'Menu',
            tableName: 'Menus',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
