import React, {useState} from 'react';
import "../../styles/City.css";
import addScheduleIdToPlace from "../../helpers/addScheduleIdToPlace";
import "react-toastify/dist/ReactToastify.css";
import AlertButton from './Alert';

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
      <AlertButton
        id={props.place.id}
        onClick={() => {
          addScheduleIdToPlace(props.place.id, targetScheduleId, props.setUser)
          setTargetScheduleId('Schedule ID')
        }}
        text={"👍 " + props.place.name + " has been added"}
      >
       
      </AlertButton>
    


      {/* <button
        // className="example_f"
        onClick={() => {
          // addScheduleIdToPlace(props.place.id, targetScheduleId, props.setUser)
          // setTargetScheduleId('Schedule ID')
        }}
      >Delete</button> */}
    </div>

  )
}
