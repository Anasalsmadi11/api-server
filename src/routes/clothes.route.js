const express=require('express')
const clothesRouter= express.Router();
const {ClothModel}= require('../models/index')

clothesRouter.get('/cloth',getClothes);
clothesRouter.get('/cloth/:id', findClothes);
clothesRouter.post('/cloth', newClothes);
clothesRouter.put('/cloth/:id', updateClothes);
clothesRouter.delete('/cloth/:id', deleteClothes)

async function getClothes(req, res) {
    let clothResult = await ClothModel.read();
    res.status(200).json(clothResult);
}

async function findClothes(req, res) {
    const clothId = parseInt(req.params.id);
    let cloth = await ClothModel.read(clothId)
    res.status(200).json(cloth);
}
async function newClothes(req, res) {
    let newCloth = req.body;
    let cloth = await ClothModel.add(newCloth);
    res.status(201).json(cloth);
}
async function updateClothes(req, res) {
    let clothId = parseInt(req.params.id);
    let updateCloth = req.body;
    let updatedCloth = await ClothModel.update(updateCloth, clothId);
    res.status(201).json(updatedCloth);
}
async function deleteClothes(req, res) {
    let clothId = parseInt(req.params.id);
    let deleteCloth = await ClothModel.delete(clothId);
    res.status(204).json(deleteCloth);
}


module.exports= clothesRouter;