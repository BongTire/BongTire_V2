
import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Payment extends Model {
    public PCCD!: string;
    public PaymentId!:number;
    public ReservationMasterId!: number;
    public res_cd!: string;
    public res_msg!: string;
    public res_en_msg!: string;
    public pay_method!:  string;
    public tno!: string;
    public amount!: number;
    static initModel(sequelize: Sequelize) {
        return super.init({
            PaymentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            ReservationMasterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            PCCD: { //reservation-1지점
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: ""
            },
            //공통응답
            res_cd: {
                type: DataTypes.STRING(4),
                allowNull: false,
            },
            res_msg: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            res_en_msg: { //필요없을듯 //승인 실패도 저장할거면 allowNull true로 변경해야함
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            pay_method: {//승인 실패도 저장할거면 allowNull true로 변경해야함
                type: DataTypes.STRING(4),
                allowNull: false,
            },
            tno: {//승인 실패도 저장할거면 allowNull true로 변경해야함
                type: DataTypes.STRING(14),
                allowNull: false,
            },
            amount: {//승인 실패도 저장할거면 allowNull true로 변경해야함
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            // //승인응답(신용카드만 가져옴)
            // card_cd: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.STRING(4),
            //     allowNull: true,
            // },
            // card_name: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.STRING(32),
            //     allowNull: true,
            // },
            // card_no: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.STRING(16),
            //     allowNull: true,
            // },
            // app_no: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.STRING(8),
            //     allowNull: true,
            // },
            // app_time: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.INTEGER,
            //     allowNull: true,
            // },
            // noinf: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.STRING(1),
            //     allowNull: true,
            // },
            // noinf_type: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.STRING(4),
            //     allowNull: true,
            // },
            // quota: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.INTEGER,
            //     allowNull: true,
            // },
            // card_mny: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.INTEGER,
            //     allowNull: true,
            // },
            // coupon_mny: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.INTEGER,
            //     allowNull: true,
            // },
            // partcanc_yn: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.STRING(1),
            //     allowNull: true,
            // },
            // card_bin_type_01: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.INTEGER,
            //     allowNull: true,
            // },
            // card_bin_type_02: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.INTEGER,
            //     allowNull: true,
            // },
            // isp_issuer_cd: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.STRING(4),
            //     allowNull: true,
            // },
            // isp_issuer_nm: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.STRING(32),
            //     allowNull: true,
            // },
            // payco_point_mny: {//승인 실패도 저장할거면 allowNull true로 변경해야함
            //     type: DataTypes.INTEGER,
            //     allowNull: true,
            // },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Payment',
            tableName: 'Payments',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
