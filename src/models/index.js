'use strict';

require('dotenv').config();
let cloth= require('./clothes');
let food= require('./food')
const {Sequelize, DataTypes}= require('sequelize')
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

    module.exports = {
        db: sequelize,
        Cloth: cloth(sequelize, DataTypes),
        Food: food(sequelize,DataTypes)
    }