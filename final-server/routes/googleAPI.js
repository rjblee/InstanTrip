// load .env data into process.env
require('dotenv').config();
const APIKey = process.env.GoogleAPIKey


const express = require('express');
const router  = express.Router();
const searchPlaces = require('../helpers/searchPlaces')

module.exports = () => {

  router.post("/searchPlaces", (req, res) => {
    const dataForSearch = {
      query: req.body.query,
      key:APIKey
    }
    if (req.body.location) {
      const location = req.body.location
      dataForSearch.location= `${location.lat},${location.lng}`
      dataForSearch.radius= '10000'
    }
    searchPlaces(dataForSearch, res)
  })

  return router;
};
