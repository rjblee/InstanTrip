const express = require('express');
const router  = express.Router();
const searchPlaces = require('../helpers/searchPlaces')
// config database


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

  return router;
};
