var express = require('express');
var router = express.Router();
const {Brand,Car,PCCD,PCCDBrandConnectionTable, sequelize, CarTrim}=  require('../../models');
const logger = require('../../config/logger');
const { Sequelize, DataTypes } = require('sequelize');
const {isAuthenticatedUser,isAuthenticatedAdmin} = require('../../middleware/auth')

/**
 *
 * TODO
 *
 * 차량 Get - 제네시스, 벤츠로 default -> 완성
 * 차량 Insert, Update             -> 완성
 * 차량 Trim Insert, Update Init   -> 완성
 * 차량 Trim Insert, Update        -> 완성
 * delete 로직                     -> 미완
 *
 */

// init Get
router.get('/',isAuthenticatedAdmin, async (req, res)=>{
    const result = [
        {
            BrandId : 1,
            name : "",
            brandLogo : "",
            origin : true,
            nation: "",
            carList:[]
        },
        {
            BrandId : 6,
            name : "",
            brandLogo : "",
            origin : true,
            nation: "",
            carList:[]
        },
    ]
    try{
        await Brand.findOne({
            where:{
                BrandId: result[0].BrandId
            }
        })
        .then((findData)=>{
            result[0].brandLogo = findData.brandLogo
            result[0].name = findData.name
            result[0].origin = findData.origin
            result[0].nation = findData.nation
            logger.info('국산 차량 브랜드 찾기 성공 '+findData)
        })
        .catch(error=>{
            logger.error(error)
        })

        const fCarBrand = await Brand.findOne({
            where:{
                BrandId: result[1].BrandId
            }
        })
        .then((findData)=>{
            result[1].brandLogo = findData.brandLogo
            result[1].name = findData.name
            result[1].origin = findData.origin
            result[1].nation = findData.nation
            logger.info('수입 차량 브랜츠 찾기 성공'+findData)
        })
        .catch(error=>{
            logger.error(error)
        })

        const kCar = await Car.findAll({
            where:{
                BrandId: result[0].BrandId
            }
        })
        .then(findData=>{
            logger.info('국산 차량 찾기 성공' + findData)
            const transArray = []


            findData.map((data)=>{
                transArray.push({
                    CarId: data.CarId,
                    BrandId: data.BrandId,
                    drivingMethodPCCD: JSON.parse(data.drivingMethodPCCD),
                    PCCD: JSON.parse(data.PCCD),
                    name: data.name,
                    codeName: data.codeName,
                    powerTrain: JSON.parse(data.powerTrain),
                    displacement: data.displacement,
                    image: data.image,
                    year: data.year,
                    deletedAt: data.deletedAt
                })

            })
            result[0].carList = [...transArray]
        })
        .catch(error=>{
            logger.error(error)
        })

        const fCar = await Car.findAll({
            where:{
                BrandId: result[1].BrandId
            }
        })
        .then(findData=>{
            logger.info('수입 차량 찾기 성공'+findData)

            const transArray = []


            findData.map((data)=>{
                transArray.push({
                    CarId: data.CarId,
                    BrandId: data.BrandId,
                    drivingMethodPCCD: JSON.parse(data.drivingMethodPCCD),
                    PCCD: JSON.parse(data.PCCD),
                    name: data.name,
                    codeName: data.codeName,
                    powerTrain: JSON.parse(data.powerTrain),
                    displacement: data.displacement,
                    image: data.image,
                    year: data.year,
                    deletedAt: data.deletedAt
                })

            })

            result[1].carList = [...transArray]
        })
        .catch(error=>{
            logger.error(error)
        })
        // TODO 공통 로직으로 변경 요청
        res.json({
            status:{
                code: 2000,
                message: "데이터를 성공적으로 전송했습니다."
            },
            data: result
        })

    }catch(error){
        console.error(error)
        // TODO 공통 로직으로 변경 요청
    }
})


// 클릭 이벤트 할시
router.get('/:id',isAuthenticatedAdmin, async (req, res)=>{
    const BrandId = parseInt(req.params.id)
    let result = {
            BrandId : BrandId,
            name : "",
            codeName:"",
            brandLogo : "",
            origin : true,
            nation: "",
            carList:[]
    }
    try{
        await Brand.findOne({
            where:{
                BrandId: BrandId
            }
        })
        .then(findData=>{
            logger.info('국산 브랜드 찾기 성공' + findData)
            result = {
                BrandId: findData.BrandId,
                name: findData.name,
                codeName : findData.codeName,
                brandLogo: findData.brandLogo,
                origin: findData.origin,
                nation: findData.nation,
                carList: []
            }
        })
        .catch(error=>{
            logger.error('브랜드 값 불러오기 오류' + error)
        })

        const CarData = await Car.findAll({
            where:{
                BrandId: BrandId
            }
        })
        .then(findData=>{
            logger.info('국산 차량 찾기 성공' + findData)
            const transArray = []


            findData.map((data)=>{
                transArray.push({
                    CarId: data.CarId,
                    BrandId: data.BrandId,
                    drivingMethodPCCD: JSON.parse(data.drivingMethodPCCD),
                    PCCD: JSON.parse(data.PCCD),
                    name: data.name,
                    codeName: data.codeName,
                    powerTrain: JSON.parse(data.powerTrain),
                    displacement: data.displacement,
                    image: data.image,
                    year: data.year,
                    deletedAt: data.deletedAt
                })

            })
            
            result.carList = [...transArray]
        })
        .catch(error=>{
            logger.error('차량 값이 없습니다'+error)
        })
        // TODO 공통 로직으로 변경 요청
        res.json({
            status: {
                code: 2000,
                message: "TODO: 해당 로직 수정 바람."
            },
            data: result
        })

    }catch(error){
        console.error(error)
        // TODO 공통 로직으로 변경 요청
        res.json({
            status: {
                code: 4000,
                message: "TODO: 해당 로직 수정 바람."
            },
            data: {}
        })
    }
})


router.post('/',isAuthenticatedAdmin, async (req, res)=>{
    const reqCarData = {
        ...req.body.data, 
        powerTrain: JSON.stringify(req.body.data.powerTrain),
        drivingMethodPCCD: JSON.stringify(req.body.data.drivingMethodPCCD),
        PCCD: JSON.stringify(req.body.data.PCCD)
    }

    try{
        if(reqCarData.CarId === null){
            await Car.create(reqCarData)
            .then( async (createData)=>{
                logger.info('차량 추가 성공' + createData)
                // TODO 공통 로직으로 변경 요청
                res.json({
                    status: {
                        code: 2000,
                        message: "데이터 추가에 성공했습니다."
                    },
                    data: []
                })
            })
        }else{
            await Car.findByPk(reqCarData.CarId)
            .then(existingData=>{
                if(existingData){
                    return Car.update(reqCarData, { where : reqCarData.CarId } )
                }else{
                    return Car.create(reqCarData)
                }
            })
            .then(result=>{
                logger.info('차량 브랜드 데이터 업데이트 성공' + result)
                // TODO 공통 로직으로 변경 요청
                res.json({
                    status: {
                        code: 2000,
                        message: "데이터 업데이트에 성공했습니다."
                    },
                    data: []
                })
            })
            .catch(error=>{
                logger.error('차량 브랜드 데이터 업데이트 실패' + error)
                // TODO 공통 로직으로 변경 요청
                res.json({
                    status: {
                        code: 4000,
                        message: "데이터 추가에 실패했습니다."
                    },
                    data: []
                })
            })
        }
    }catch(error){
        logger.error('차량 추가에 실패했습니다.'+error)
    }
})


// 초기에 데이터를 넣을 때 사용하는 URL
router.post('/init',isAuthenticatedAdmin, async (req, res)=>{
    const initCarData = await req.body.data

    initCarData.map((car)=>{
        car.PCCD = JSON.stringify(car.PCCD)
        car.drivingMethodPCCD = JSON.stringify(car.drivingMethodPCCD)
        car.powerTrain = JSON.stringify(car.powerTrain)
    })
    console.log(initCarData)
    try{
        Car.bulkCreate(initCarData)
        .then(()=>{
            logger.info(Car.findAll())
            
            // TODO 공통 로직으로 변경 요청
            const result = {
                status: {
                    code : 2000,
                    message: '차량 초기화 데이터 생성 성공'
                }
            }
            
            res.json(result)
        })
        .catch(error=>{
            // TODO 공통 로직으로 변경 요청
            logger.error('차량 데이터 생성 실패'+error)
        })
    }catch(error){
        logger.error(error)
    }
})


router.get('/trim/:id',isAuthenticatedAdmin, async(req, res)=>{
    const carId = req.params.id
    
    let carTrimData = {
        CarId: carId,
        name: null,
        brand:{
            BrandId: null,
            name: null,
            codeName: null,
            brandLogo: null,
            origin: null,
            nation: null
        },
        yearList:[]
    }
    try{
        Car.findOne({
            where: {
                CarId: carId
            }
        })
        .then(carData=>{
            carTrimData.CarId = carData.CarId
            carTrimData.name = carData.name
        })
        .catch(e=>{
            logger.error('차량 데이터를 찾을 수 없습니다' + e)
        })
    }catch(error){
        logger.error(error)
    }

    try{
        await Car.findOne({
            where:{
                CarId: carId
            }
        })
        .then(async carData=>{
            const brandId = carData.BrandId
            await Brand.findOne({
                where: {
                    BrandId: brandId
                }
            })
            .then(findData=>{
                carTrimData.brand.BrandId = findData.BrandId
                carTrimData.brand.name = findData.name
                carTrimData.brand.codeName = findData.codeName
                carTrimData.brand.brandLogo = findData.brandLogo
                carTrimData.brand.origin = findData.origin
                carTrimData.brand.nation = findData.nation
            })
            .catch(e=>{
                logger.error('브랜드 데이터를 정상적으로 찾아오지 못했습니다.' + e)
            })

        })
        .catch(e=>{
            logger.error('차량 데이터가 정상적이지 않습니다.' + e)
        })
    }
    catch(error){
        logger.error(error)
    }

    
    try{
        CarTrim.findAll({
            where: {
                CarId: carId
            }
        })
        .then(async (findData) => {
            const brandId = findData[0].BrandId

            

            const groupedDataByYear = transformCarData(findData);
            console.log(groupedDataByYear)
            carTrimData.yearList = [...groupedDataByYear]
            res.json({
                status:{
                    code: 2000,
                    message: "트림 데이터를 성공적으로 가져왔습니다."
                },
                data:{...carTrimData}
            })
        })
        .catch(e=>{
            logger.error('차량 데이터를 가져오는데 실패했습니다.'+e)
            
            res.json({
                status:{
                    code: 4000,
                    message: "데이터를 가져오는데 실패했습니다."
                },
                data:{...carTrimData}
            })
            
        })
    }catch(e){
        logger.error(e)
        res.json({
            status:{
                code: 4000,
                message: "데이터를 가져오는데 실패했습니다."
            },
            data:{...carTrimData}
        })
    }
})

router.post('/trim',isAuthenticatedAdmin, async (req, res)=>{
    const carTrimData = req.body.data

    try{
        if(carTrimData.CarTrimId === null){
            CarTrim.create(carTrimData)
            .then(createData=>{
                logger.info('트림 데이터 생성 성공'+createData)
            })
            .catch(error=>{
                logger.error('트림 데이터 생성 실패' + error)
            })
        }else{
            CarTrim.findByPk(carTrimData.CarTrimId)
            .then(existingData=>{
                if(existingData){
                    return CarTrim.update(carTrimData, { where: { CarTrimId: carTrimData.CarTrimId } })
                }else{
                    return CarTrim.create(carTrimData)
                }
            })
            .then(result=>{
                logger.info('트림 데이터 업데이트 및 추가 성공' + result)
                // TODO 공통 로직으로 변경 요청
                res.json({
                    status: {
                        code: 2000,
                        message: "데이터 업데이트에 성공했습니다."
                    },
                    data: []
                })
            })
            .catch(error=>{
                logger.error('트림 데이터 업데이트 및 추가 실패' + error)
                // TODO 공통 로직으로 변경 요청
                res.json({
                    status: {
                        code: 4000,
                        message: "데이터 업데이트에 실패했습니다."
                    },
                    data: []
                })
            })
        }
    }catch(error){

    }
})

// 초반에 데이터를 생성할 때 추가
router.post('/trim/init',isAuthenticatedAdmin, async (req, res)=>{
    const carTrimDatas = req.body.data
    try{
        CarTrim.bulkCreate(carTrimDatas)
        .then(()=>{
            logger.info(CarTrim.findAll())
            // TODO 공통 로직으로 변경 요청
            res.json({
                status: {
                    code: 2000,
                    message: '성공'
                },
                data:[]
            })
        })
        .catch(error=>{
            logger.error('데이터 생성에 실패했습니다.' + error)
            // TODO 공통 로직으로 변경 요청
            res.json({
                status: {
                    code: 4000,
                    message: '실패'
                },
                data:[]
            })
        })
    }catch(error){
        logger.error('차량 트림을 추가 하지 못했습니다.'+error)
    }

})

function transformCarData(data) {
    let transformedData = [];

    // 연도별로 데이터 분리
    let years = new Set(data.map(carTrim => carTrim.year));
    years.forEach(year => {
        let trimList = [];
        data.forEach(carTrim => {
            if (carTrim.year === year) {
                let trim = {
                    id: carTrim.CarTrimId,
                    name: carTrim.name,
                    price: carTrim.price.toLocaleString(),
                    image: carTrim.image,
                    frontTire: carTrim.frontTireSize,
                    rearTire: carTrim.rearTireSize,
                    frontBrake: carTrim.frontBrackeType,
                    rearBrake: carTrim.rearBrackeType,
                    traction: carTrim.traction,
                    curbWeight: carTrim.curbWeight,
                    combinedEfficiency: carTrim.combinedEfficiency + "km/l"
                };
                trimList.push(trim);
            }
        });
        transformedData.push({ year: year, trimList: trimList });
    });

    return transformedData;
}

module.exports = router;