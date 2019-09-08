import React, {useState} from 'react';
import "../../styles/City.css";
import addScheduleIdToPlace from "../../helpers/addScheduleIdToPlace"

export default function AllPlaceItem(props) {
  const [targetScheduleId, setTargetScheduleId] = useState('Schedule ID')
  
  // TO access to picture of each 
  // use props.place.picture
  return (
    <div className="AllPlaceItem">
      <h3>{props.place.name}</h3>
      <h3>{props.place.address}</h3>

      <select
        className="form-control"
        value={targetScheduleId}
        onChange={(event) => {
          setTargetScheduleId(event.target.value)
        }}
        >
        <option selected>Schedule ID</option>
        {props.schedules.map((schedule) => {
          return <option value={schedule.id}>{schedule.id}</option>
        })}
      </select>
      <button
        onClick={() => {
          addScheduleIdToPlace(props.place.id, targetScheduleId, props.setUser)
          setTargetScheduleId('Schedule ID')
        }}
      >Add to schedule</button>

    </div>
  )
}
