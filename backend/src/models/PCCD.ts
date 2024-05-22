import { Model, DataTypes, Sequelize } from 'sequelize';

export default class PCCD extends Model {
    public PCCDId!: number;
    public firstName!: string;
    public firstCodeName!: string | null;
    public secondName!: string;
    public secondCodeName!: string | null;
    public PCCD!: string;
    public icon!: string | null;

    static initModel(sequelize: Sequelize) {
        return super.init({
            PCCDId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ""
            },
            firstCodeName: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            secondName: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ""
            },
            secondCodeName: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            PCCD: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            icon: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'PCCD',
            tableName: 'PCCDs',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
