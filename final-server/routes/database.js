const express = require('express');
const router  = express.Router();
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

module.exports = () => {

  router.get("/user/:id/places", (req,res) => {
    db.query(`SELECT * 
              FROM users JOIN cities ON users.id = cities.user_id
              JOIN places ON cities.id = places.city_id
              Where users.id = $1`, [req.params.id])
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


  //get cities based on user 
  router.get('/user/:id/cities', (req, res) => {
    db.query(`SELECT * 
              FROM cities WHERE user_id = $1`, [req.params.id]).then((response) => {
                res.send(response.rows)
              }).catch((err) => {
                console.log(err)
              })
  })



  router.post('/places', (req, res) => {

    const place = req.body.place
    if (req.body.existCity === 'true') {
      // add place to city if city is in database 
      db.query(`Insert INTO places (lat, lng, rating, picture, placeId, city_id, name, address)
                values ($1, $2, $3, $4, $5, $6, $7, $8)
                `, [place.lat, place.lng, place.rating, place.picture, place.placeId, req.body.city.id, place.name, place.address])
                .then(() => {
                  res.send('success')
                }).catch((err) => { console.log(err)})
    } else {
      city = req.body.city
      user = req.body.user
      // create city first and then add place to city
      db.query(`Insert Into cities (city, c_lat, c_lng, user_id, c_picture)
                values ($1, $2, $3, $4, $5)
                RETURNING *`
                ,[city.name, city.lat, city.lng, user.id, city.picture])
                .then((response) => {
                  // insert place to database with ref to created city
                  const cityId = response.rows[0].id
                  const createdCity = response.rows[0]
                  db.query(`Insert INTO places (lat, lng, rating, picture, placeId, city_id, name, address)
                  values ($1, $2, $3, $4, $5, $6, $7, $8)
                  `, [place.lat, place.lng, place.rating, place.picture, place.placeId, cityId, place.name, place.address])
                  .then(() => {
                    res.send(createdCity)
                  }).catch((err) => { console.log(err)})
                }).catch((err) => { console.log(err)})
    }
  })
 

  router.post('/cities', (req, res) => {
    const city = req.body.city
    const user = req.body.user
    db.query(`INSERT INTO cities (city, c_lat, c_lng, user_id, c_picture)
              values ($1, $2, $3, $4, $5) RETURNING *
            `, [city.name, city.lat, city.lng, user.id, city.picture]).then((response) => {
              res.send(response.rows[0])
            }).catch((err) => {
              console.log(err)
            })})



  router.post('/schedules', (req, res) => {

    const placesClusters = req.body.placesClusters;
    const cityId = req.body.cityId;


    // delete recent cooresponding rows in schedule table 
    db.query(`DELETE FROM schedules
              WHERE city_id = $1
             `, [cityId]).then( () => {
               // then re-create schedule instance in schedules table
               Promise.all(
                 placesClusters.map((placesCluster) => {
                   return db.query(`INSERT INTO schedules (city_id)
                                     values ($1)
                                     RETURNING *
                                     `, 
                                     [cityId]
                                   )
                 })
               ).then(all => {
                 scheduleIds = all.map(each => {
                   return each.rows[0].id
                 })
                 
                 //prepare for Promise all
                 // combine place data with schedule id
                 dbQuerysPrep =[]
                 for (let i = 0; i < scheduleIds.length; i++) {
                   const scheduleId = scheduleIds[i]
                   for (let place of placesClusters[i]) {
                     dbQuerysPrep.push({place: place, scheduleId: scheduleId})
                   }
                 }
                 // resolve all dbquerys 
                 Promise.all(
                   dbQuerysPrep.map((each) => {
                     return db.query(`UPDATE places 
                                      SET schedule_id = $1
                                      WHERE id = $2
                                      RETURNING *
                                      `, [each.scheduleId, each.place.id])
           
                   })
                 ).then((all) => {
                   //and then send back response
                   const updatedPlaces = all.map(each => each.rows[0])
                   res.send(updatedPlaces)
                 })
               })

             }).catch(err => console.log(err))
  })


  router.get(`/city/:id/schedules`, (req, res) => {
    const cityId = req.params.id
    db.query(`SELECT * FROM schedules
              WHERE city_id = $1
              `, [cityId]
            ).then((response) => {
              res.send(response.rows)
            })
  })

  // add schedule id to places 
  router.put(`/places/:id/schedule`, (req, res) => {
    const scheduleId = req.body.scheduleId
    const placeId = req.params.id

    db.query(`UPDATE places 
              SET schedule_id = $1
              WHERE id = $2
              `, [scheduleId, placeId]).then(() => {
                res.send('successs')
              }).catch(err => console.log(err))
  })

  //delete schedule id from places
  router.delete(`/places/:id/schedule`, (req, res) => {
    const placeId = req.params.id


    db.query(`UPDATE places
              SET schedule_id = $1
              WHERE id = $2
              `, [null, placeId]).then(() => {
                res.send('successs')
              }).catch(err => console.log(err))
  })


  // update schedule table with start loc, end loc, transit
  router.put(`/schedule/:id`, (req, res) => {
    const start_place = req.body.start_place || null;
    const end_place = req.body.end_place || null;
    const transit = req.body.transit || null;
    const scheduleId = req.params.id


    db.query(`UPDATE schedules
              SET start_place = $1, end_place = $2, transit = $3
              WHERE id = $4
              RETURNING *
              `, [start_place, end_place, transit, scheduleId]).then((response) => {
                const newSchedule = response.rows[0]
                res.send(newSchedule)
              }).catch(err => console.log(err))
  })


  
  return router;
};
