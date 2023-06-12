'use strict'

const express = require("express");
const app = express();
const foodRouter= require('./routes/food.route')
const clothesRouter= require('./routes/clothes.route')
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

app.use(express.json());
app.use(foodRouter);
app.use(clothesRouter);

app.get('/', welcomeHandler);
function welcomeHandler(req, res) {
    res.status(200).send('welcome to home page');
}

app.use('*', notFoundHandler);
app.use(errorHandler)

function start(port) {
    app.listen(port, () => {
        console.log(`server is up and listen on ${port}`)
    });
}
module.exports = {
    start: start,
    app: app,
}