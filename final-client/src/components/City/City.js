import React, {useState} from 'react';
import Wishlist from "./Wishlist";
import "../../styles/City.css";
import Map from './Map';
import SearchBar from '../SearchBar/searchBar'
import createAndSaveSchecules from '../../helpers/createAndSaveSchecules'

export default function City(props) {
  //access
  //props.city 
  //props .places 
  // props.setUser
  const [foundPlaces, setfoundPlaces] = useState([])
  
  // function takes place data, k value to do clustering 
  // and then  city id to  create row in schedules table
  // and add schedule id into schedule_id colume of places table
  // then update data by calling setUser(prev => {return prev})
  createAndSaveSchecules(props.places, 2, props.city, props.setUser)




  return(
    <>
      <p> here is the city page</p>
      
      <SearchBar setplaces={setfoundPlaces} city={props.city}/>

      <Wishlist></Wishlist>

      {/* <Map></Map> */}
    </>


  )
}
