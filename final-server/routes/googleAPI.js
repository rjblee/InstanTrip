const express = require('express');
const router  = express.Router();
const request = require('then-request');
const { Pool } = require('pg');
// config database
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

module.exports = () => {
  router.get("/", (req, res) => {
    res.send('hello world')
  });

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
    
    request(
      'POST',
      'https://maps.googleapis.com/maps/api/place/textsearch/json',
      {
        qs: dataForSearch
      }
      ).getBody('utf8').done((response) => {
        const placeArray = JSON.parse(response).results
        const resultPlaces = []
        let pictureCount = 0;
        for (let place of placeArray) {
          let targetPlace = {}
          targetPlace.name = place.name
          targetPlace.address = place.formatted_address
          targetPlace.lat = place.geometry.location.lat
          targetPlace.lng = place.geometry.location.lng
          targetPlace.placeId = place.place_id
          targetPlace.rating = place.rating
          resultPlaces.push(targetPlace)
        }
        console.log(placeArray[0].photos[0].photo_reference)
        Promise.all(placeArray.map(place => {
          return request(
            'POST',
            'https://maps.googleapis.com/maps/api/place/photo',
            {
              qs : {
                maxwidth: 200,
                photoreference: place.photos[0].photo_reference,
                key: "AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U"
              }
            }
            )
        })).then((all) => {
          const pictures = all.map(each => each.url)
          for (let i = 0; i < resultPlaces.length; i ++) {
            resultPlaces[i].picture = pictures[i]
          }
          res.send(resultPlaces)
        })

      })
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
