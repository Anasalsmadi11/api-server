'use strict';



let Cloth= (sequelize,DataTypes) =>
    sequelize.define("clothes",{
        clothType:{
            type:DataTypes.STRING,
            allowNull:false
        },
        color:{
            type:DataTypes.STRING
        }
    })

    module.exports= Cloth;