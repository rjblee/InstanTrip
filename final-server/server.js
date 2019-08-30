// load .env data into process.env
require('dotenv').config();


// Web server config
const PORT       = process.env.PORT;
const express    = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const app        = express();
const morgan     = require('morgan');
const { Pool } = require('pg');

//middleware config
app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// config database
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();


// db query example 
// db.query(`select * from users`).then((res) => {
//   console.log('we got the data')
//   console.log(res.rows)
// })



// Separated Routes for each Resource
const helloRoute = require("./routes/helloRoute.js");


// Mount all resource routes
app.use(helloRoute());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
