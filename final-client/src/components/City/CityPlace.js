import React, { useState} from 'react';
import savePlaceToDatabase from '../../helpers/savePlaceToDatabase'

export default function CityPlace(props) {

  // console.log('citiys----------')
  // console.log(props.cities)
  return (
    <div className="cityPlaceCard d-flex">
      <img className="placeImage" src={props.place.picture} alt=''></img>
      <div>
        <p>{props.place.name}</p>
        <p>{props.place.address}</p>
        {/* <p>{props.place.rating}</p> */}

        <button className='example_g'
          onClick={() => {
            savePlaceToDatabase(props, props.city, props.setUser)
          }}
        >Add Place</button>
        
      </div>
    </div>
  )
}
