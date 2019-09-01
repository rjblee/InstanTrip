const express = require('express');
const router  = express.Router();
const request = require('then-request');
const synRequest = require('sync-request');

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
        const endPlaces = []
        for (let place of placeArray) {
          let targetPlace = {}
          targetPlace.address = place.formatted_address
          targetPlace.lat = place.geometry.location.lat
          targetPlace.lng = place.geometry.location.lng
          targetPlace.placeId = place.place_id
          targetPlace.rating = place.rating
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
          targetPlace.picture = pictureRequest.url
          endPlaces.push(targetPlace)
        }
        console.log(endPlaces)
        res.send(endPlaces)
      })
  })

  return router;
};
