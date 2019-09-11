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
        
      <p className="name">{props.place.name}</p>
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

      ><img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAAAmJLR0QA/4ePzL8AAAGaSURBVFjD5di7SgNBFIDhv4gx0WCIgmih7yIWQsQgeAELn0ERHyCFForYKBa21haGeEHxBcQQm4gX1HgpvKCQygvRYxHDRpONu5uZTdA57XI+2GHOmTPwv1YzQyyyQ5qnr7hgmwUGCalI72WYDbKISWRZZ4g654CfCa5N0xfGFeP4nRD9XFgC8nFGnz0gyKotIB8rBKwSbRw4IgQhQasVopMTx4QgHNHxO3FVEZHbnfZyhI9ExYQg7FFvjiwrIQRhyYzoUUYIH3SXIgJcKkSENI3FyKRSQhDGfhIN3ClHbn+WmlHlhCCMfEd2tSBbhUSoTDGvJN5oMpABLYQgRAxkThsyYyCb2pC4gZxqQ44M5FEb8mAgryU/sLtK5Xh2A3lx43fdu7zxcW3ImsuHMaINCbtcIHUVllgVmlY9N8qJdPFI4cJFArwcKiVSeKt0uQOYV4bMVvnCDS2kKiaSBGtgCMqNc0nHxL61cQ7AQ5R320CWKB57zbTbZis7pkv/Y4Gvhp89Ch8PepkmxjkZBCHDOTGmCH/vF39/fQLpHUUd18DwGwAAAABJRU5ErkJggg=="/></button>

      >Delete</button> */}

    </div>

  )
}
