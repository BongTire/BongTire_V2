import { Model, DataTypes, Sequelize } from 'sequelize';

export default class OwnCar extends Model {
    public OwnCarId!: number;
    public CarId!: number;
    public BrandId!: number;
    public UserId!: number;
    public carNumber!: string;
    public PCCD!: string;
    public isRepresent!: boolean;

    static initModel(sequelize: Sequelize) {
        return super.init({
            OwnCarId: {
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
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            carNumber: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            PCCD: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            isRepresent: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'OwnCar',
            tableName: 'Owncars',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
