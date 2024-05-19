const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];



const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password,{
    ...config,
    define: {
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_unicode_ci',
      },
    },
  });
db.sequelize = sequelize;
db.Sequelize = Sequelize;


const Brand = require('./Brand');
const Calendar = require('./Calendar');
const Car = require('./Car');
const CarHashTagConnection = require('./CarHashTagConnection');
const CarTrim = require('./CarTrim');
const Filter = require('./Filter');
const HashTag = require('./HashTag');
const Menu = require('./Menu');
const OperationTime = require('./OperationTime');
const OtherproductHashTagConnection = require('./OtherproductHashTagConnection');
const OwnCar = require('./OwnCar');
const Page = require('./Page');
const PCCD = require('./PCCD');
const PCCDBrandConnectionTable = require('./PCCDBrandConnectionTable');
const Post = require('./Post');
const Product = require('./Product');
const PTCD = require('./PTCD');
const ReservationMaster = require('./ReservationMaster');
const ReservationProduct = require('./ReservationProduct');
const ReservationTime = require('./ReservationTime');
const Revenue = require('./Revenue');
const Tire = require('./Tire');
const TireHashTagConnection = require('./TireHashTagConnection');
const User = require('./User');
const Wheel = require('./Wheel');
const WheelHashTagConnection = require('./WheelHashTagConnection');


db.User = User;
db.Calendar=Calendar
db.Car =Car
db.CarHashTagConnection =CarHashTagConnection
db.CarTrim =CarTrim
db.Filter =Filter
db.HashTag =HashTag
db.Menu =Menu
db.OperationTime =OperationTime
db.OtherproductHashTagConnection =OtherproductHashTagConnection
db.OwnCar =OwnCar
db.Page =Page
db.PCCD =PCCD
db.PCCDBrandConnectionTable =PCCDBrandConnectionTable
db.Post =Post
db.Product =Product
db.PTCD =PTCD
db.ReservationMaster =ReservationMaster
db.ReservationProduct =ReservationProduct
db.ReservationTime =ReservationTime
db.Revenue =Revenue
db.Tire =Tire
db.TireHashTagConnection =TireHashTagConnection
db.Wheel =Wheel
db.WheelHashTagConnection =WheelHashTagConnection
db.Brand = Brand




User.init(sequelize);
Calendar.init(sequelize);
Car.init(sequelize);
CarHashTagConnection.init(sequelize);
CarTrim.init(sequelize);
Filter.init(sequelize);
HashTag.init(sequelize);
Menu.init(sequelize);
OperationTime.init(sequelize);
OtherproductHashTagConnection.init(sequelize);
OwnCar.init(sequelize);
Page.init(sequelize);
PCCD.init(sequelize);
PCCDBrandConnectionTable.init(sequelize);
Post.init(sequelize);
Product.init(sequelize);
PTCD.init(sequelize);
ReservationMaster.init(sequelize);
ReservationProduct.init(sequelize);
ReservationTime.init(sequelize);
Revenue.init(sequelize);
Tire.init(sequelize);
TireHashTagConnection.init(sequelize);
Wheel.init(sequelize);
WheelHashTagConnection.init(sequelize);
Brand.init(sequelize);



//User.associate(db);




module.exports = db;