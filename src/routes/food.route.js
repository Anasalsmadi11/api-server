const express=require('express')
const foodRouter= express.Router();
const {Food}= require('../models/index')

foodRouter.get('/food',getFood);
foodRouter.get('/food/:id', findFood);
foodRouter.post('/food', newFood);
foodRouter.put('/food/:id', updateFood);
foodRouter.delete('/food/:id', deleteFood)

async function getFood(req,res){
    let result= await Food.findAll();
    res.status(200).json(result);
}

async function findFood(req,res){
    let foodId= parseInt(req.params.id)
    let food= await Food.findOne({where:{id:foodId}})
    res.status(200).json(food)
}

async function newFood(req,res){
    let newFood= req.body
    let food= await Food.create(newFood)
    res.status(201).json(food)
}

async function updateFood(req,res){
    let foodId= parseInt(req.params.id)
    let updateFood= req.body
    let findFood= await Food.findOne({where:{id:foodId}})
    let updatedFood= await findFood.update(updateFood)
    res.status(201).json(updatedFood)
}

async function deleteFood(req,res){
    let foodId= parseInt(req.params.id)
    let deleteFood= await Food.destroy({where:{id:foodId}})
    res.status(204).json(deleteFood) //here it shoud be json not sent cus it didnt work
}

module.exports= foodRouter;