import React, { useState} from 'react';
import savePlaceToDatabase from '../../helpers/savePlaceToDatabase'

export default function Place(props) {

  // console.log(targetCity)
  // console.log('citiys----------')
  // console.log(props.cities)
  return (
    <div className="placeCard d-flex">
      <img className="placeImage" src={props.place.picture} alt=''></img>
      <div>
        <p>Name: {props.place.name}</p>
        <p>Address: {props.place.address}</p>
        <p>Rating: {props.place.rating}</p>

        <button
          onClick={() => {
            savePlaceToDatabase(props, props.city)
          }}
        >Add Place</button>
        
      </div>
    </div>
  )
}
