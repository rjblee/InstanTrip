import React, { useState} from 'react';
import savePlaceToDatabase from '../../helpers/savePlaceToDatabase'

export default function Place(props) {

  // console.log('citiys----------')
  // console.log(props.cities)
  return (
    <div className="placeCard d-flex">
      <img className="placeImage" src={props.place.picture} alt=''></img>
      <div>
        <p>{props.place.name}</p>
        <p>{props.place.address}</p>
        <p>{props.place.rating}</p>

        <button
          onClick={() => {
            savePlaceToDatabase(props, props.city)
          }}
        >Add Place</button>
        
      </div>
    </div>
  )
}
