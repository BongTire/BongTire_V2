import express, { Request, Response, Router } from 'express';
import { Op } from 'sequelize';
import db from '../../models';
import logger from '../../config/logger';
import { isAuthenticatedUser, isAuthenticatedAdmin } from '../../middleware/auth';

const Brand = db.Brand
const PCCD = db.PCCD
const router: Router = express.Router();

router.get('/', isAuthenticatedAdmin, async function(req: Request, res: Response) {
    try {
        let productType: any[] = [];

        const type = await PCCD.findAll({
            where: {
                PCCD: {
                    [Op.like]: 'P06%'
                }
            }
        });

        productType = type.map((item: any) => {
            return {
                id: item.PCCDId,
                PCCD: item.PCCD,
                title: item.secondName,
                icon: item.icon,
                brand: []
            };
        });

        const tireBrand = await Brand.findAll({
            where: {
                PCCD: {
                    [Op.like]: '%P0601%'
                }
            }
        });

        const wheelBrand = await Brand.findAll({
            where: {
                PCCD: {
                    [Op.like]: '%P0602%'
                }
            }
        });

        const mapBrandData = (findData: any) => {
            return findData.map((data: any) => {
                logger.info(JSON.parse(data.PCCD))
                return {
                    BrandId: data.BrandId,
                    PCCD: JSON.parse(data.PCCD),//이거 안됨
                    name: data.name,
                    brandLogo: data.brandLogo,
                    origin: data.origin,
                    nation: data.nation,
                    deletedAt: data.deletedAt
                };
            });
        };

        productType[0].brand = mapBrandData(tireBrand);
        productType[1].brand = mapBrandData(wheelBrand);

        res.json({
            status: {
                code: 2000,
                message: "ProductType 데이터 전송 성공"
            },
            data: productType
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: {
                code: 4000,
                message: error
            }
        });
    }
});

export default router;
