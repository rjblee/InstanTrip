// load .env data into process.env
require('dotenv').config();


// Web server config
const PORT       = process.env.PORT;
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const morgan     = require('morgan');
const  cors = require('cors')

//middleware config
app.use(cors())
app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// Separated Routes for each Resource
const googleAPIRoutes = require("./routes/googleAPI.js");
const datbaseRoutes = require("./routes/database.js");


// Mount all resource routes
app.use(googleAPIRoutes());
app.use(datbaseRoutes());



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
