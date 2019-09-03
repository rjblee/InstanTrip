const express = require('express');
const router  = express.Router();
const request = require('then-request');
const { Pool } = require('pg');
const searchPlaces = require('../helpers/searchPlaces')
// config database
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

module.exports = () => {

  router.post("/searchPlaces", (req, res) => {
    const dataForSearch = {
      query: req.body.query,
      key:"AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U"
    }

    if (req.body.location) {
      const location = req.body.location
      dataForSearch.location= `${location.lat},${location.lng}`
      dataForSearch.radius= '10000'
    }
    
    searchPlaces(dataForSearch, res)
  })

  router.post("/userdata", (req,res) => {
    console.log(req.body)
    db.query(`SELECT * 
              FROM users JOIN cities ON users.id = cities.user_id
              JOIN places ON cities.id = places.city_id
              Where users.name = $1`, [req.body.name])
              .then((response) => {
                res.send(response.rows)
              }).catch((err) => {
                console.log(err)
              })
  })

  router.post("/user", (req,res) => {
    db.query(`SELECT * FROM users WHERE name=$1 AND password=$2`,[req.body.name,req.body.password])
      .then((response) => {
        res.send(response.rows)
      }).catch((err) => {
        console.log(err)
      })
  })
  return router;
};
