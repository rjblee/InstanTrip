import React, {useState, useEffect} from 'react';
import Wishlist from "./Wishlist";
import "../../styles/City.css";
import Map from './Map';
import axios from "axios";
import SearchBar from '../SearchBar/searchBar'

import createAndSaveSchecules from '../../helpers/createAndSaveSchecules'
import StartEndTransitForm from './StartEndTransitForm'
import TravelSteps from './TravelSteps'
// import SearchResultList from './SearchResultList'
import CityPlace from './CityPlace'
import WishlistItem from './WishlistItem';
import ScheduleList from './ScheduleList'


import addScheduleIdToPlace from '../../helpers/addScheduleIdToPlace'
//example: 
// addScheduleIdToPlace(1, '1234', props.setUser)

import deleteScheduleFromPlace from '../../helpers/deleteScheduleFromPlace'
//example:
//deleteScheduleFromPlace(1, props.setUser)


export default function City(props) {
  //access
  //props.city 
  //props.places 
  const [schedules, setSchedules] = useState([])
  const [foundPlaces, setfoundPlaces] = useState([])

  const [kValue, setKValue] = useState('')

  const [currentSchedule, setCurrentSchedule] = useState({id: 'All', city_id: '', start_place: null, end_place: null, transit: null})
  const [steps,setSteps] = useState([])
  const [megaSteps, setMegaSteps] = useState([])
  const [targetMap, setTargetMap] = useState({})

  // console.log('mega----steps ')
  // console.log(steps.map((each) => {
  //   return [each.start_location.lat(), each.start_location.lng()]
  // }))
  // console.log(megaSteps.map((each) => {
  //   return [each.start_location.lat(), each.start_location.lng()]
  // }))
  // console.log(`here is the place data for ${props.city.city}`)
  // console.log(props.places)
  // console.log('schedules')
  // console.log(schedules)
  // console.log('setcurrent schedule')
  // console.log(currentSchedule)
  console.log('currentSchedule')
  console.log(currentSchedule)
  console.log('steps')
  console.log(steps)
  console.log('mage steps')
  console.log(megaSteps)

  useEffect( () => { 
    
    // extract schedules
    if(props.city.id) {
      axios.get(`/city/${props.city.id}/schedules`).then(response => {
        // console.log('maybe we have it')
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

// console.log("XXXXXXXX", props)
// // console.log("CCCCC",props.city.c_lat)

  return(
    <>
      {/* <p> here is the city page</p> */}

      {/* <button
        onClick={() => {
          console.log(targetMap)
          targetMap.setCenter({lat: 49.246292, lng: -123.116226})
          targetMap.setZoom(12)
        }}
      >test center</button> */}
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
            setMegaSteps([])
            setSteps([])
          }}
        >Make Schedule</button>
      </div>

      <SearchBar 
        setplaces={setfoundPlaces} 
        city={props.city}
        setMegaSteps={setMegaSteps}
        setSteps={setSteps}
        defaultValue='text'
        />
      
      
      <div className="mb-5">
        <div className="row">
          <div className="col-1" ></div>
          <div className="col-6">
            <Map
            // places={props.places.filter((places)=>{
            //   return 
            //   places.schedule_id === schedule.id
            // })}
            // start_location={start_location}
            // end_location={start_location}
            // schedule={currentSchedule}
            // setSchedule={setCurrentSchedule}
            places={props.places.filter((place) => {
              if (currentSchedule.id === "All") {
                return true
              } else {
                return place.schedule_id === currentSchedule.id
              }
            })}
            currentSchedule={currentSchedule}
            lat={props.city.c_lat}
            lng={props.city.c_lng}
            setMegaSteps={setMegaSteps}
            setSteps={setSteps}
            setTargetMap = {setTargetMap}
           />
          </div>
          <div className="col-4">

            <ScheduleList
              places={props.places}
              schedules={schedules}
              setUser={props.setUser}
              setCurrentSchedule={setCurrentSchedule}
              setMegaSteps={setMegaSteps}
              setSteps={setSteps}
              foundPlaces={foundPlaces}
              setfoundPlaces={setfoundPlaces}
              city={props.city}
            />

          </div>
          <div className="col-1" ></div>
        </div>
      </div>

      <StartEndTransitForm
        currentSchedule = {currentSchedule}
        setCurrentSchedule = {setCurrentSchedule}
        places={props.places}
        setSchedules={setSchedules}
        setSteps={setSteps}
        setTargetMap = {setTargetMap}
      /> 
      {steps.length === megaSteps.length && megaSteps.length ? 
      <div className="row">
        <div className="col-1" ></div>
        <div className="col-10">
          <TravelSteps
          steps={steps}
          megaSteps={megaSteps}
          places={props.places}
          targetMap={targetMap}
          />
        </div>

      
      <div className='scroll-foundPlace'>

        <div className="col-1" ></div>
      </div>
      </div>
      : <div></div>
      }

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
