import { Model, DataTypes, Sequelize } from 'sequelize';

export default class PTCD extends Model {
    public PTCDId!: number;
    public menuTypeName!: string;
    public menuTypeCode!: string;
    public pageTypeName!: string;
    public PTCD!: string;

    static initModel(sequelize: Sequelize) {
        return super.init({
            PTCDId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            menuTypeName: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            menuTypeCode: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            pageTypeName: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            PTCD: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'PTCD',
            tableName: 'PTCDs',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
