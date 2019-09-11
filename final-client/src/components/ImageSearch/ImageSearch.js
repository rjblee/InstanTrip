import React, { useState} from 'react';
import Place from './Place'
import axios from "axios";
import "../../styles/ImageSearch.css";
import SearchBar from '../SearchBar/searchBar'

export default function ImageSearch(props) {
  // const [inputvalue, setInputvalue] = useState('')
  // const [searchOption, setSearchOption] = useState('image')
  const [places, setplaces] = useState([])
  // console.log(places)

  return(
    <>
      <div className="search-page-text">
      <h1><b style={{color: 'white'}}>Search Your Wonders</b></h1>
      </div>

      <SearchBar setplaces={setplaces}/>
      <div className='scoll-placeCard'>
        {places.map((place) => {
          return(
              
            <Place
              place={place}
              key={place.placeId}
              cities={props.cities}
              user={props.user}
              setCities={props.setCities}
            />  
          )
        })}
      </div>
    </>
  )
}

