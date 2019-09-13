import React, {useState} from 'react';
import "../../styles/City.css";
import deleteScheduleFromPlace from '../../helpers/deleteScheduleFromPlace'

export default function SchedulePlaceItem(props) {
  
  return (
    <div className="SchedulePlaceItem">
      <div className='schedulePlaceitem row'>
      <div
      className='col-5'
      >
      <img className="placeImage" src={props.place.picture} alt='' ></img>
      </div>
      <div
      className="col-7"
      >
      <p className="name">{props.place.name}</p>
      <p className="address">{props.place.address}</p>
      <button  className="example_g"
        onClick={() => {
          deleteScheduleFromPlace(props.place.id, props.setUser)
        }}
      >Remove</button>
      </div>
    </div>
    </div>
  )
}
