'use strict';


let Food=(sequelize,DataTypes)=>
    sequelize.define("employee",{
        foodName:{
            type:DataTypes.STRING,
            allowNull: false
        }
    })

module.exports= Food;