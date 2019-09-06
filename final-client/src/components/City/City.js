import React, {useState} from 'react';
import Wishlist from "./Wishlist";
import "../../styles/City.css";
// import Map from './Map';

import SearchBar from '../SearchBar/searchBar'


export default function City(props) {
  const [places, setplaces] = useState([])
  
  return(

    <>
      <p> here is the city page</p>
      <SearchBar setplaces={setplaces} city={props.city}/>
      <Wishlist></Wishlist>
      {/* <Map></Map> */}
    </>


  )
}
