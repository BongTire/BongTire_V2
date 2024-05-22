import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Filter extends Model {
    public FilterId!: number;
    public PCCD!: string;
    public FilterPCCD!: string;
    public name!: string;
    public isBrand!: boolean;
    public isDrivingMethod!: boolean;

    static initModel(sequelize: Sequelize) {
        return super.init({
            FilterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            PCCD: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            FilterPCCD: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: ""
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: ""
            },
            isBrand: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            isDrivingMethod: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Filter',
            tableName: 'Filters',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
