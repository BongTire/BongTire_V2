import express, { Request, Response } from 'express';
import logger from '../../config/logger';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { site_cd, ordr_idxx, pay_method, good_name, good_mny, currency, buyr_name , buyr_tel1, buyr_mail, enc_info , enc_data, tran_cd } = req.body;
    console.log(req.body);
    // 외부 결제 게이트웨이에 보낼 데이터 구성
    const requestData = {
        tran_cd: tran_cd,
        ordr_mony: good_mny,
        kcp_cert_info: "-----BEGIN CERTIFICATE-----MIID3DCCAsSgAwIBAgIJAM...=-----END CERTIFICATE-----",
        site_cd: site_cd,
        enc_data: enc_data,
        enc_info: enc_info,
        ordr_no: ordr_idxx,
        pay_type: "PACA"
    };

    try {
        const response = await fetch('https://stg-spl.kcp.co.kr/gw/enc/v1/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();
        res.json({ success: true, data: result });
    } catch (error:any) {
        res.json({ success: false, error: error.message });
    }
})

export default router;
