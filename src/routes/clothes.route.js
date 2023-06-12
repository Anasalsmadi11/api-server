const express=require('express')
const clothesRouter= express.Router();
const {Cloth}= require('../models/index')

clothesRouter.get('/cloth',getClothes);
clothesRouter.get('/cloth/:id', findClothes);
clothesRouter.post('/cloth', newClothes);
clothesRouter.put('/cloth/:id', updateClothes);
clothesRouter.delete('/cloth/:id', deleteClothes)

async function getClothes(req,res){
    let result= await Cloth.findAll();
    res.status(200).json(result);
}

async function findClothes(req,res){
    let clothId= parseInt(req.params.id)
    let cloth= await Cloth.findOne({where:{id:clothId}})
    res.status(200).json(cloth)
}

async function newClothes(req,res){
    let newClothes= req.body
    let cloth= await Cloth.create(newClothes)
    res.status(201).json(cloth)
}

async function updateClothes(req,res){
    let clothId= parseInt(req.params.id)
    let updateClothes= req.body
    let findClothes= await Cloth.findOne({where:{id:clothId}})
    let updatedCloth= await findClothes.update(updateClothes)
    res.status(201).json(updatedCloth)
}

async function deleteClothes(req,res){
    let clothId= parseInt(req.params.id)
    let deleteClothes= await Cloth.destroy({where:{id:clothId}})
    res.status(204).json(deleteClothes) //here it shoud be json not sent cus it didnt work
}

module.exports= clothesRouter;