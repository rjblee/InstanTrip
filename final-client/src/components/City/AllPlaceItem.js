import React, {useState} from 'react';
import "../../styles/City.css";
import addScheduleIdToPlace from "../../helpers/addScheduleIdToPlace"

export default function AllPlaceItem(props) {
  const [targetScheduleId, setTargetScheduleId] = useState('Schedule ID')
  
  // TO access to picture of each 
  // use props.place.picture
  return (
    <div className="AllPlaceItem">
      
      <img src={props.place.picture} alt=''></img>
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

        className="add-button"

        onClick={() => {
          addScheduleIdToPlace(props.place.id, targetScheduleId, props.setUser)
          setTargetScheduleId('Schedule ID')
        }}

      ><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNjAiIGhlaWdodD0iNjAiCnZpZXdCb3g9IjAgMCAzMCAzMCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij4gICAgPHBhdGggZD0iTTE1LDNDOC4zNzMsMywzLDguMzczLDMsMTVjMCw2LjYyNyw1LjM3MywxMiwxMiwxMnMxMi01LjM3MywxMi0xMkMyNyw4LjM3MywyMS42MjcsMywxNSwzeiBNMjAsMTZoLTR2NCBjMCwwLjU1My0wLjQ0OCwxLTEsMXMtMS0wLjQ0Ny0xLTF2LTRoLTRjLTAuNTUyLDAtMS0wLjQ0Ny0xLTFzMC40NDgtMSwxLTFoNHYtNGMwLTAuNTUzLDAuNDQ4LTEsMS0xczEsMC40NDcsMSwxdjRoNCBjMC41NTIsMCwxLDAuNDQ3LDEsMVMyMC41NTIsMTYsMjAsMTZ6Ij48L3BhdGg+PC9zdmc+"/></button>

      <button
        className="delete-button"
        // className="example_f"
        onClick={() => {
          // addScheduleIdToPlace(props.place.id, targetScheduleId, props.setUser)
          // setTargetScheduleId('Schedule ID')
        }}
      ><img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAAAmJLR0QA/4ePzL8AAAGaSURBVFjD5di7SgNBFIDhv4gx0WCIgmih7yIWQsQgeAELn0ERHyCFForYKBa21haGeEHxBcQQm4gX1HgpvKCQygvRYxHDRpONu5uZTdA57XI+2GHOmTPwv1YzQyyyQ5qnr7hgmwUGCalI72WYDbKISWRZZ4g654CfCa5N0xfGFeP4nRD9XFgC8nFGnz0gyKotIB8rBKwSbRw4IgQhQasVopMTx4QgHNHxO3FVEZHbnfZyhI9ExYQg7FFvjiwrIQRhyYzoUUYIH3SXIgJcKkSENI3FyKRSQhDGfhIN3ClHbn+WmlHlhCCMfEd2tSBbhUSoTDGvJN5oMpABLYQgRAxkThsyYyCb2pC4gZxqQ44M5FEb8mAgryU/sLtK5Xh2A3lx43fdu7zxcW3ImsuHMaINCbtcIHUVllgVmlY9N8qJdPFI4cJFArwcKiVSeKt0uQOYV4bMVvnCDS2kKiaSBGtgCMqNc0nHxL61cQ7AQ5R320CWKB57zbTbZis7pkv/Y4Gvhp89Ch8PepkmxjkZBCHDOTGmCH/vF39/fQLpHUUd18DwGwAAAABJRU5ErkJggg=="/></button>
    </div>

  )
}
