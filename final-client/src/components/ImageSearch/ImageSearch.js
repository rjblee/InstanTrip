import React, { useState, useEffect} from 'react';
import Place from './Place'
import axios from "axios";
import "../../styles/ImageSearch.css";
import SearchBar from '../SearchBar/searchBar'
import searchPlaces from '../../helpers/searchPlaces'

export default function ImageSearch(props) {
  const [places, setplaces] = useState([])


  useEffect(() => {
    const queryData = { query: 'places of interest'}
    searchPlaces(queryData).then(function(response) {
      props.setAlert('')
      if(response.data.length) {
        setplaces(response.data)
      } else {
        props.setAlert('No places found')
      }
    }).catch((err) => console.log(err))

  },[])

  
  return(
    <>
      <div className="search-page-text">
      <h1><b style={{color: 'white'}}>Search Your Wonders</b></h1>
      </div>

    <SearchBar 
      setplaces={setplaces}
      setAlert={props.setAlert}
    />
    <div className='scoll-placeCard'>
        {places.map((place) => {
              return(
                <Place
                      userdata={props.userdata}
                      place={place}
                      key={place.placeId}
                      cities={props.cities}
                      user={props.user}
                      setCities={props.setCities}
                      setUser={props.setUser}
                      setAlert={props.setAlert}
                      />
              
              )
            })}
    </div>


  </>

  )
}

