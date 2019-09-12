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

    <div className="AllPlaceItem row">
      <div
      className='col-5'
      >
      <img className='img-all' src={props.place.picture} alt=''></img>
      </div>
      <div
      className="col-7"
      >
        
      <p className="name"><b>{props.place.name}</b></p>
      <p className='address'>{props.place.address}</p>
      <div 
        className="row"
      >
        <div
        className="col-8"
        >


      <select
        className="schedule-drop"
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
        </div>
        <div
        className='col-4'
        >
      <AlertButton
        onClick={() => {
          addScheduleIdToPlace(props.place.id, targetScheduleId, props.setUser)
          setTargetScheduleId('Schedule ID')
        }}
        text={"👍 " + props.place.name + " has been added"}
      >
      </AlertButton>
        </div>
      </div>
        
      </div>
    


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
