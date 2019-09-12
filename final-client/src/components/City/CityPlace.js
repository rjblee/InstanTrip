import React, { useState} from 'react';
import savePlaceToDatabase from '../../helpers/savePlaceToDatabase'

export default function CityPlace(props) {

  // console.log('citiys----------')
  // console.log(props.cities)

        //              setAlert={props.setAlert}
  //

  // props.setAlert
  // props.userdata
  return (
    <div className="cityPlaceCard d-flex">
      <img className="placeImage" src={props.place.picture} alt=''></img>
      <div>
        <p>{props.place.name}</p>
        <p>{props.place.address}</p>
        {/* <p>{props.place.rating}</p> */}

        <button className='example_g'
          onClick={() => {
            props.setAlert('')
            // check if place is in database already
            const placeName = props.place.name
            const filteredPlaces = props.userdata.filter((each) => {
              return each.name === placeName
            })
            if (filteredPlaces.length === 0 ) {
              // add markers to map 
              console.log('add marks')
              console.log(props.addMarker)
              props.addMarker[0](props.place.lat, props.place.lng, props.place.name)

              // add place to database
              savePlaceToDatabase(props, props.city, props.setUser)

            } else {
              props.setAlert('Failed to save place. Check if you are signed in and place is not in wishlist already')
            }
          }}
        >Add Place</button>
        
      </div>
    </div>
  )
}
