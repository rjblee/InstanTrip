import React, { useState} from 'react';
import savePlaceToDatabase from '../../helpers/savePlaceToDatabase'
import "../../styles/ImageSearch.css";
import AlertButton from '../City/Alert';

export default function Place(props) {
  const [targetCity, setTargetCity] = useState('')
  return (
    
    <div className="placeCard d-flex">
      <div className='Place row'>
      <div className='col-5'>


      <img className="placeImage" src={props.place.picture} alt=''></img>
      </div>
      <div
      className="col-7"
      >
      
        <p className='name'><b>{props.place.name}</b></p>
        <p className="address">{props.place.address}</p>
        <div className='inputAdd row'>
          <div className="col-8">
            <input 
                className="wishlist-dropdown"
                type="text" 
                name="targetCity" 
                list="targetCity"
                style={{width:'100%'}}
                placeholder="Add place to City"
                value= {targetCity}
                onChange ={event => {
                  setTargetCity(event.target.value)
                }}
              />
           <datalist 
              id="targetCity"
              value={targetCity}
              onChange={event => {
                setTargetCity(event.target.value)
              }}
            >
              {props.cities.map( (item) => {
                return <option
                          key={item.id}
                      >{item.city}</option>
              })}
            </datalist>
        </div>
        <div className="col-1"></div>
      <div className="col-3">
          <AlertButton
          onClick={() => {
            props.setAlert('')
            // check if place is in database already
            const placeName = props.place.name
            const filteredPlaces = props.userdata.filter((each) => {
              return each.name === placeName
            })

            if (filteredPlaces.length === 0 ) {
              savePlaceToDatabase(props, targetCity, props.setUser)
            } else {
              props.setAlert('Failed to save place. Check if you are signed in and place is not in wishlist already')
            }


          }}
        text={"👍 " + props.place.name + " has been added"}
         ></AlertButton>
          </div>
          </div>
        </div>
      </div>
    </div>
   
  )
}
