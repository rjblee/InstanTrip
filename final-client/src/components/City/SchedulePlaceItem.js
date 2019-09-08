import React, {useState} from 'react';
import "../../styles/City.css";
import deleteScheduleFromPlace from '../../helpers/deleteScheduleFromPlace'

export default function SchedulePlaceItem(props) {
  
  // TO access to picture of each 
  // use props.place.picture
  return (
    <div className="SchedulePlaceItem">
      <h3>{props.place.name}</h3>
      <h3>{props.place.address}</h3>
      <button
        onClick={() => {
          deleteScheduleFromPlace(props.place.id, props.setUser)
        }}
      >Remove from schedule</button>

    </div>
  )
}
