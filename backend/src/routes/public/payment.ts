import express, { Request, Response } from 'express';
import logger from '../../config/logger';
import db from '../../models'
import { returnFormat } from '../../utils/return';
const ReservationMaster = db.ReservationMaster
const RservationProduct = db.ReservationProduct
const Tire = db.Tire
const Wheel = db.Wheel
const Payment = db.Payment

const router = express.Router();
interface RequestData {
    site_cd?: string; 
    tno?: string; 
    kcp_cert_info?: string; 
    kcp_sign_data?: string; 
    mod_type?: any; 
    mod_mny?: number; 
    rem_mny?: number; 
    mod_desc?: any; 
}


router.post('/order', async (req: Request, res: Response) => { //주문 요청
    console.log(req.body);
    const data = req.body.data; //data.ReservationId 필요함
    try {
        const reservationData = await ReservationMaster.findOne({
            where:{
                ReservationMasterId:data.ReservationMasterId
            },
            raw:true
        })
        const reservationCode = reservationData?.ReservationCode
        const ordr_idxx = reservationCode ? ("R0401"+reservationCode.replace(/[-]/g, '')) : null//영문+숫자 (R0401 + 예약번호에서 - 뺀거)
        const reservationProducts = await RservationProduct.findAll({
            where:{
                ReservationMasterId:data.ReservationMasterId
            }
        })
        let good_name;
        if(reservationProducts[0].PCCD === "P0601"){ //타이어
            const product = await Tire.findOne({
                where:{
                    TireId : reservationProducts[0].ProductId
                }
            })
            good_name = product?.productName
        }else if(reservationProducts[0].PCCD === "P0602"){ //휠
            const product = await Wheel.findOne({
                where:{
                    WheelId : reservationProducts[0].ProductId
                }
            })
            
            good_name = product?.productName
        }else{
            logger.info('상품 찾기 실패')
            //returnFormatData = returnFormat(4000,'상품 찾기 실패',{})
            //res.json(returnFormatData);
        }
        logger.info('good_name: '+ good_name)
        
        const pay_method = 100000000000
        // 외부 결제 게이트웨이에 보낼 데이터 구성
        const requestData = {
            site_cd: process.env.site_cd,
            ordr_idxx:ordr_idxx,
            pay_method:pay_method,
            good_name:good_name,
            good_mny:reservationData?.totalPrice,
            currency: 410,
            shop_user_id: reservationCode, //
            site_name:"BONGTIRE",
        };
        logger.info('주문 요청 파라미터 출력완료')
        const returnFormatData = returnFormat(2000,'주문 요청 파라미터 출력완료',requestData)
        res.json(returnFormatData);
    } catch (error:any) {
        logger.info('주문 요청 파라미터 출력실패')
        const returnFormatData = returnFormat(2000,'주문 요청 파라미터 출력실패',error)
        res.json(returnFormatData);
    }
})
router.post('/', async (req: Request, res: Response) => { //주소 바꿔야함
    const {enc_info , enc_data, tran_cd, ordr_idxx,good_mny,ReservationMasterId} = req.body; // 결제 창에서 내려 주는 값
    logger.info(req.body)
    console.log(JSON.stringify(req.body));
    try {
        const reservationData = await ReservationMaster.findOne({
            where:{
                ReservationMasterId:ReservationMasterId
            },
            raw:true
        })
        const reservationCode = reservationData?.ReservationCode
        //const ordr_idxx = reservationCode ? ("R0401"+reservationCode.replace(/[-]/g, '')) : null//영문+숫자 (R0401 + 예약번호에서 - 뺀거)
        const reservationProducts = await RservationProduct.findAll({
            where:{
                ReservationMasterId:ReservationMasterId
            }
        })

        // 외부 결제 게이트웨이에 보낼 데이터 구성
        const requestData = {
            site_cd: process.env.site_cd,
            kcp_cert_info: process.env.kcp_cert_info,
            enc_data: enc_data,
            enc_info: enc_info,
            tran_cd: tran_cd,
            pay_type: "PACA",
            ordr_no: ordr_idxx,
            ordr_mony: good_mny, 
        };
        logger.info("requestData: "+JSON.stringify(requestData))
        const paymentApprovalURL = process.env.PaymentApprovalURL || 'https://stg-spl.kcp.co.kr/gw/enc/v1/payment'
        const response = await fetch(paymentApprovalURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        const result:any = await response.json();
        if(result.res_cd === "0000"){ //정상승인이 이루어졌을때
            const paymentResponse = await Payment.create({
                ReservationMasterId: ReservationMasterId,
                res_cd: result.res_cd,
                res_msg:result.res_msg,
                res_en_msg: result.res_en_msg,
                pay_method: result.pay_method,
                tno: result.tno,
                amount: result.amount,
                PCCD:'R0801' //'a'지점
            })
            logger.info("paymentResponse: "+JSON.stringify(paymentResponse))
        }else{
            logger.info("결제가 승인되지 않았습니다.")
        }
        logger.info("result: "+JSON.stringify(result))
        res.json({ success: true, data: result });
    } catch (error:any) {
        res.json({ success: false, error: error.message });
    }
})
router.post('/cancellation', async (req: Request, res: Response) => {
    const {mod_type,mod_mny,rem_mny,mod_desc} = req.body; // 결제 창에서 내려 주는 값
    logger.info(req.body)
    
    console.log(JSON.stringify(req.body));
    const data = req.body;
    try {
        const reservationData = await ReservationMaster.findOne({
            where:{
                ReservationMasterId:data.ReservationMasterId,

            },
            raw: true
        })
        const reservationCode = reservationData?.ReservationCode
        //const ordr_idxx = reservationCode ? ("R0401"+reservationCode.replace(/[-]/g, '')) : null//영문+숫자 (R0401 + 예약번호에서 - 뺀거)
        const reservationProducts = await RservationProduct.findAll({
            where:{
                ReservationMasterId:data.ReservationMasterId
            }
        })
        const paymentData = await Payment.findOne({
            where:{
                ReservationMasterId:reservationData?.ReservationMasterId,
                res_cd : "0000" //결제승인에 성공한것
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
        const tno = paymentData?.tno //db에서 꺼내와야함
        

        // 외부 결제 게이트웨이에 보낼 데이터 구성
        const requestData :RequestData= {
            site_cd: process.env.site_cd, // KCP 발급 사이트(상점) 코드
            tno: tno, // NHN KCP 거래 고유번호
            kcp_cert_info: process.env.kcp_cert_info, // KCP 인증서 정보 (직렬화)
            kcp_sign_data: process.env.kcp_sign_data, // KCP 암호화 데이터 site_cd + "^" + tno + "^" + mod_type
            mod_type: mod_type, // 전체 승인취소 - STSC / 부분취소 - STPC
            mod_desc: mod_desc // 취소 사유
        };
        
        // 조건부로 추가할 프로퍼티
        if (mod_mny !== undefined) {
            requestData.mod_mny = mod_mny; // 부분 취소일 경우 부분 취소 금액
        }
        
        if (rem_mny !== undefined) {
            requestData.rem_mny = rem_mny; // 부분 취소일 경우 남은 원거래 금액
        }
        logger.info("requestData: "+JSON.stringify(requestData))
        const PaymentCancellationURL = process.env.PaymentCancellationURL ||'https://stg-spl.kcp.co.kr/gw/mod/v1/cancel' //일단 결제가안되는 url 넣어놓음
        const response = await fetch(PaymentCancellationURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();
        logger.info("result: "+JSON.stringify(result))
        res.json({ success: true, data: result });
    } catch (error:any) {
        res.json({ success: false, error: error.message });
    }
})

export default router;
