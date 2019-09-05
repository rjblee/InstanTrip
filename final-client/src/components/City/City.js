import React, {useState} from 'react';
import Wishlist from "./Wishlist";
import "../../styles/City.css";
import Map from './Map';

import SearchBar from '../SearchBar/searchBar'


export default function City(props) {
  const [places, setplaces] = useState([])
  console.log('city-----------')
  console.log(props.city)
  console.log(props.places)
  return(

    <>
      <p> here is the city page</p>
      <SearchBar setplaces={setplaces} city={props.city}/>
      <Wishlist></Wishlist>
      <Map></Map>
    </>


  )
}
