// load .env data into process.env
require('dotenv').config();


// Web server config
const PORT       = process.env.PORT;
const express    = require("express");
const bodyParser = require("body-parser");
const request = require('then-request');
const app        = express();
const morgan     = require('morgan');
const  cors = require('cors')

//middleware config
app.use(cors())
app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// db query example 
// db.query(`select * from users`).then((res) => {
//   console.log('we got the data')
//   console.log(res.rows)
// })



// Separated Routes for each Resource
const googleAPIRoutes = require("./routes/googleAPI.js");


// Mount all resource routes
app.use(googleAPIRoutes());



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



// test request
// console.log('here is the test')
// request(
//   'POST',
//   'https://maps.googleapis.com/maps/api/place/textsearch/json',
//   {
//     qs: {
//       query: `vancouver aqua`,
//       key: "AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U"
//     }
//   }
//   ).getBody('utf8').done((response) => {
//     console.log(response)
  // })

// axios({
//   method: 'post',
//   url: '/searchPlaces',
//   data: {
//     query: `${query}`,
//     key: "AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U"
//   }
// }).then((response) => {
//   console.log(response)
// })