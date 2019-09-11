import React, { useState, useEffect} from 'react';
import Place from './Place'
import axios from "axios";
import "../../styles/ImageSearch.css";
import SearchBar from '../SearchBar/searchBar'
import searchPlaces from '../../helpers/searchPlaces'

export default function ImageSearch(props) {
  // const [inputvalue, setInputvalue] = useState('')
  // const [searchOption, setSearchOption] = useState('image')
  const [places, setplaces] = useState([])

  // console.log(places)

  useEffect(() => {
    const queryData = { query: 'places of interest'}
    searchPlaces(queryData).then(function(response) {
      // console.log(props)
      props.setAlert('')
      // console.log('here is places')
      // console.log(response.data)
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

