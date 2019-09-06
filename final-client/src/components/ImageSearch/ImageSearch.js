import React, { useState} from 'react';
import Place from './Place'
import axios from "axios";
import "../../styles/ImageSearch.css";
import SearchBar from '../SearchBar/searchBar'

export default function ImageSearch(props) {
  // const [inputvalue, setInputvalue] = useState('')
  // const [searchOption, setSearchOption] = useState('image')
  const [places, setplaces] = useState([])
  console.log(places)


  return(

  <>
    <p> here is the imageSearch page</p>
    <SearchBar setplaces={setplaces}/>

    {places.map((place) => {
          return <Place
                  place={place}
                  key={place.placeId}
                  cities={props.cities}
                  user={props.user}
                  setCities={props.setCities}
                  />
        })}

  </>
  )
}

