import React, {useState} from 'react';
import searchPlaces from '../../helpers/searchPlaces';

import Place from '../ImageSearch/Place';

import SearchBar from '../SearchBar/searchBar';

export default function SearchResultList(props) {
  // const [inputvalue, setInputvalue] = useState('')
  // const [searchOption, setSearchOption] = useState('image')
  const [places, setplaces] = useState([])
  console.log(places)


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
