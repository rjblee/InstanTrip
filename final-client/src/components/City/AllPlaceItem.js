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
      <h5>{props.place.address}</h5>

      <select
        className="schedule-dropdown"
        value={targetScheduleId}
        onChange={(event) => {
          setTargetScheduleId(event.target.value)
        }}
        >
        <option defaultValue>Schedule</option>
        {props.schedules.map((schedule) => {
          return <option value={schedule.id}>{schedule.id}</option>
        })}
      </select>
      <button
        className="example_d"
        onClick={() => {
          addScheduleIdToPlace(props.place.id, targetScheduleId, props.setUser)
          setTargetScheduleId('Schedule ID')
        }}
      >Add</button>
      {/* <a href="https://icons8.com/icon/47259/delete-bin">Delete Bin icon by Icons8</a> */}
      <button
        // className="example_f"
        onClick={() => {
          // addScheduleIdToPlace(props.place.id, targetScheduleId, props.setUser)
          // setTargetScheduleId('Schedule ID')
        }}
      >Delete</button>
    </div>
  )
}
