import React, {useState} from 'react';
import searchPlaces from '../../helpers/searchPlaces';

import Place from '../ImageSearch/Place';

import SearchBar from '../SearchBar/searchBar';

export default function SearchResultList(props) {
  const [places, setplaces] = useState([])

  return(

  <>
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
