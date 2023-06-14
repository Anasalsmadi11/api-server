'use strict';

require('dotenv').config();
let cloth= require('./clothes');

const customersSchema = require('./customer.model');
const {Sequelize, DataTypes}= require('sequelize')
const Collection= require('./lib/collection')
const POSTGRES_URI= process.env.NODE_ENV==="test"? "sqlite::memory:": process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === "production" ?
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    } :
    {}

    let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);


    const customersTable = customersSchema(sequelize, DataTypes);
    const customerCloth=  cloth(sequelize, DataTypes);

    const customerCollection = new Collection(customersTable);
    const clothCollection = new Collection(customerCloth);
    
    
    customersTable.hasMany(customerCloth, {
        foreignKey: 'customerId', // the foreignKey's value should exactly be the same as how it was defined in the table of customer
        sourceKey: 'id',
    });
    customerCloth.belongsTo(customersTable, {
        foreignKey: 'customerId',
        targetKey: 'id',
    });
    

    

    module.exports = {
        db: sequelize,
       ClothModel: clothCollection,
       CustomerModel: customerCollection

    }