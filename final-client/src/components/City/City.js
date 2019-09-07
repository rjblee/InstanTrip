import React, {useState, useEffect} from 'react';
import Wishlist from "./Wishlist";
import "../../styles/City.css";
import Map from './Map';
import axios from "axios";
import SearchBar from '../SearchBar/searchBar'

import createAndSaveSchecules from '../../helpers/createAndSaveSchecules'
import ScheduleForm from './ScheduleForm'
import Demo from './Step'
// import SearchResultList from './SearchResultList'
import CityPlace from './CityPlace'
import WishlistItem from './WishlistItem';


import addScheduleIdToPlace from '../../helpers/addScheduleIdToPlace'
//example: 
// addScheduleIdToPlace(1, '1234', props.setUser)

import deleteScheduleFromPlace from '../../helpers/deleteScheduleFromPlace'
//example:
//deleteScheduleFromPlace(1, props.setUser)

import updateSchedule from '../..//helpers/updateSchedule'
//example:
//updateSchedule(2, '33322222111start!!!1231111', "33332222111end!!!123111", '33322221111transit!!!1231111', setSchedules)


export default function City(props) {
  //access
  //props.city 
  //props .places 
  const [schedules, setSchedules] = useState([])
  const [foundPlaces, setfoundPlaces] = useState([])

  const [currentSchedule, setCurrentSchedule] = useState([])

  const [kValue, setKValue] = useState('')


  // console.log(`here is the place data for ${props.city.city}`)
  // console.log(props.places)
  // console.log('schedules')
  // console.log(schedules)


  useEffect( () => { 
    
    // extract schedules
    if(props.city.id) {
      axios.get(`/city/${props.city.id}/schedules`).then(response => {
        console.log('maybe we have it')
        setSchedules(response.data)
      })
    }
  },[])

  // let lng;
  // let lat;

  // if (foundPlaces.length > 0) {
  //   lng = foundPlaces[0].lng
  //   lat = foundPlaces[0].lat
  // }

console.log("XXXXXXXX", props)

  return(
    <>
      <p> here is the city page</p>

    <div className="form-inline">
      <div className="form-group mx-sm-3 mb-2">
        <input 
          type="text" 
          className="form-control" 
          placeholder={`Days in ${props.city.city}`}
          value={kValue}
          onChange={(event) => {
            setKValue(event.target.value)
          }}
          />
      </div>
      <button 
        type="submit" 
        className="btn btn-primary mb-2"
        onClick={() => {
          // function takes place data, k value to do clustering 
          // and then  city id to  create row in schedules table
          // and add schedule id into schedule_id colume of places table
          // then update data by calling setUser(prev => {return prev})
          createAndSaveSchecules(props.places, kValue, props.city, setSchedules, props.setUser)
        }}
      >Make Schedule</button>
    </div>

      <SearchBar setplaces={setfoundPlaces} city={props.city}/>
      
      
      <div>
        <div class="row">
          <div class="col-1" ></div>
          <div class="col-6">
            <Map
            // places={props.places.filter((places)=>{
            //   return 
            //   places.schedule_id === schedule.id
            // })}
            // start_location={start_location}
            // end_location={start_location}
            // schedule={currentSchedule}
            // setSchedule={setCurrentSchedule}

           />
          </div>
          <div class="col-4">
          
           <Wishlist
                  places={props.places}  
                  />
        
          </div>
          <div class="col-1" ></div>
        </div>
      </div>

    <div><Demo /></div>
    
    <div>
    {foundPlaces.map((place) => {
          return <CityPlace
                  place={place}
                  key={place.placeId}
                  city={props.city}
                  user={props.user}
                  setCities={props.setCities}
                  />
        })}
    </div>

    </>

  )
}
