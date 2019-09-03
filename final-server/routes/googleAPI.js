const express = require('express');
const router  = express.Router();
const request = require('then-request');
const synRequest = require('sync-request');
const { Pool } = require('pg');
// config database
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

module.exports = () => {
  router.get("/", (req, res) => {
    res.send('hello world')
  });


  // request("POST", "https:")
  //   .then(response=> {
  //     response.data
  //     return request("POST", "https:")
  //   })
  //   .then(response => {
  //     response.data 
  //     return Promise.all(response.data.map(place => request("POST", "https://maps.googleapis.com/maps/api/place/photo",{
  //       qs: {
  //         maxwidth: 200,
  //         photoreference: place.photos[0].photo_reference,
  //         key: "AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U"
  //       }
  //     })))
  //   })
  //   .then(all => 
      
  //     all[0].data)


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
        const endPlaces = []
        let pictureCount = 0;
        for (let place of placeArray) {
          let targetPlace = {}
          targetPlace.name = place.name
          targetPlace.address = place.formatted_address
          targetPlace.lat = place.geometry.location.lat
          targetPlace.lng = place.geometry.location.lng
          targetPlace.placeId = place.place_id
          targetPlace.rating = place.rating
          // const pictureRequest = synRequest(
          const pictureRequest = synRequest(
            'POST',
            'https://maps.googleapis.com/maps/api/place/photo',
            {
              qs: {
                maxwidth: 200,
                photoreference: place.photos[0].photo_reference,
                key: "AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U"
              }
            }
          )
          // .getBody('utf8').done((res) => {
            
          // })
          targetPlace.picture = pictureRequest.url
          endPlaces.push(targetPlace)
          pictureCount += 1;
        }
        while (pictureCount < placeArray.length) {

        }
        console.log(endPlaces)
        res.send(endPlaces)
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
  // db.query(`SELECT * 
  // FROM users JOIN wishlist ON user.id = wishlist.user_id
  // JOIN places ON wishlist.id = places.wishlist_id where users.name = $1`, ['Jiadan'])

  return router;
};
