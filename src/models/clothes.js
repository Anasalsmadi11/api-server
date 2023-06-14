'use strict';



let customerCloth= (sequelize,DataTypes) =>
    sequelize.define("clothes",{
        clothType:{
            type:DataTypes.STRING,
            allowNull:false
        },
        color:{
            type:DataTypes.STRING
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })

    module.exports= customerCloth;