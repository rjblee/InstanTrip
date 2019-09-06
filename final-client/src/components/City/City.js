import React, {useState, useEffect} from 'react';
import Wishlist from "./Wishlist";
import "../../styles/City.css";
import Map from './Map';
import axios from "axios";
import SearchBar from '../SearchBar/searchBar'
import createAndSaveSchecules from '../../helpers/createAndSaveSchecules'

export default function City(props) {
  //access
  //props.city 
  //props .places 
  // props.setUser
  const [schedules, setSchedules] = useState([])
  const [foundPlaces, setfoundPlaces] = useState([])

  
  console.log(`here is the place data for ${props.city.city}`)
  console.log(props .places)
  console.log('schedules')
  console.log(schedules)

  useEffect( () => {
    // function takes place data, k value to do clustering 
    // and then  city id to  create row in schedules table
    // and add schedule id into schedule_id colume of places table
    // then update data by calling setUser(prev => {return prev})
    createAndSaveSchecules(props.places, 2, props.city, props.setUser)
  
    // extract schedules
    axios.get(`/city/${props.city.id}/schedules`).then(response => {
      console.log('maybe we have it')
      setSchedules(response.data)
    })
  },[])



  return(
    <>
      <p> here is the city page</p>
      
      <SearchBar setplaces={setfoundPlaces} city={props.city}/>

      <Wishlist></Wishlist>

      {/* <Map></Map> */}
    </>


  )
}
