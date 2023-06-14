const express = require('express');
const customersRouter = express.Router();
const Collection = require('../models/lib/collection');
const { CustomerModel,ClothModel} = require('../models/index');

customersRouter.get("/customer", getAllCustomers);
customersRouter.get("/customer/:id", getOneCustomer);
customersRouter.post("/customer", createCustomer);
customersRouter.put("/customer/:id", updateCustomer);
customersRouter.delete("/customer/:id", deleteCustomer);


customersRouter.get("/customerClothes/:id", customerClothes);
async function customerClothes(req, res) {
    const CustomerId = parseInt(req.params.id);
    let customerClothesResult = await CustomerModel.readCustomerClothes(CustomerId, ClothModel.model);
    res.status(200).json(customerClothesResult);
}
async function getAllCustomers(req, res) {
    let customersResult = await CustomerModel.read();
    res.status(200).json(customersResult);
}

async function getOneCustomer(req, res) {
    const CustomerId = parseInt(req.params.id);
    let Customer = await CustomerModel.read(CustomerId)
    res.status(200).json(Customer);
}
async function createCustomer(req, res) {
    let newCustomer = req.body;
    let Customer = await CustomerModel.add(newCustomer);
    res.status(201).json(Customer);
}
async function updateCustomer(req, res) {
    let CustomerId = parseInt(req.params.id);
    let updateCustomer = req.body;
    let foundCustomer = await CustomerModel.update(updateCustomer, CustomerId);
    res.status(201).json(foundCustomer);
}
async function deleteCustomer(req, res) {
    let CustomerId = parseInt(req.params.id);
    let deleteCustomer = await CustomerModel.delete(CustomerId);
    res.status(204).json(deleteCustomer);
}

module.exports = customersRouter;