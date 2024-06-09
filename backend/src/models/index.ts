import { Sequelize } from 'sequelize';
import config from '../config/config';

import Brand from './Brand';
import Calendar from './Calendar';
import Car from './Car';
import CarHashTagConnection from './CarHashTagConnection';
import CarTrim from './CarTrim';
import Filter from './Filter';
import HashTag from './HashTag';
import Menu from './Menu';
import OperationTime from './OperationTime';
import OtherproductHashTagConnection from './OtherproductHashTagConnection';
import OwnCar from './OwnCar';
import Page from './Page';
import PCCD from './PCCD';
import PCCDBrandConnectionTable from './PCCDBrandConnectionTable';
import Post from './Post';
import Product from './Product';
import PTCD from './PTCD';
import ReservationMaster from './ReservationMaster';
import ReservationProduct from './ReservationProduct';
import ReservationTime from './ReservationTime';
import Revenue from './Revenue';
import Tire from './Tire';
import TireHashTagConnection from './TireHashTagConnection';
import User from './User';
import Wheel from './Wheel';
import WheelHashTagConnection from './WheelHashTagConnection';
import Payment from './Payment';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: parseInt(dbConfig.port, 10),
    dialect: dbConfig.dialect,
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    timezone: '+09:00',
});
User.initModel(sequelize)
Calendar.initModel(sequelize)
Car.initModel(sequelize)
CarHashTagConnection.initModel(sequelize)
CarTrim.initModel(sequelize)
Filter.initModel(sequelize)
HashTag.initModel(sequelize)
Menu.initModel(sequelize)
OperationTime.initModel(sequelize)
OtherproductHashTagConnection.initModel(sequelize)
OwnCar.initModel(sequelize)
Page.initModel(sequelize)
PCCD.initModel(sequelize)
PCCDBrandConnectionTable.initModel(sequelize)
Post.initModel(sequelize)
Product.initModel(sequelize)
PTCD.initModel(sequelize)
ReservationMaster.initModel(sequelize)
ReservationProduct.initModel(sequelize)
ReservationTime.initModel(sequelize)
Revenue.initModel(sequelize)
Tire.initModel(sequelize)
TireHashTagConnection.initModel(sequelize)
Wheel.initModel(sequelize)
WheelHashTagConnection.initModel(sequelize)
Brand.initModel(sequelize)
Payment.initModel(sequelize)

const db = {
    sequelize,
    Sequelize,
    User: User,
    Calendar: Calendar,
    Car: Car,
    CarHashTagConnection: CarHashTagConnection,
    CarTrim: CarTrim,
    Filter: Filter,
    HashTag: HashTag,
    Menu: Menu,
    OperationTime: OperationTime,
    OtherproductHashTagConnection: OtherproductHashTagConnection,
    OwnCar: OwnCar,
    Page: Page,
    PCCD: PCCD,
    PCCDBrandConnectionTable: PCCDBrandConnectionTable,
    Post: Post,
    Product: Product,
    PTCD: PTCD,
    ReservationMaster: ReservationMaster,
    ReservationProduct: ReservationProduct,
    ReservationTime: ReservationTime,
    Revenue: Revenue,
    Tire: Tire,
    TireHashTagConnection: TireHashTagConnection,
    Wheel: Wheel,
    WheelHashTagConnection: WheelHashTagConnection,
    Brand: Brand,
    Payment:Payment
};

export default db;
