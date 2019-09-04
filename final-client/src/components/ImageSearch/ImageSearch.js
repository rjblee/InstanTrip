import React, {Fragment, useState} from 'react';
import searchPlaces from '../../helpers/searchPlaces'
import Place from './Place'

export default function ImageSearch(props) {
  const [inputvalue, setInputvalue] = useState('')
  const [places, setplaces] = useState([])
  console.log(places)
  return(
  <Fragment>
    <p> here is the imageSearch page</p>
    <div className="form-inline">
      <div className="form-group mx-sm-3 mb-2">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search for place"
          value={inputvalue}
          onChange={event => {
            setInputvalue(event.target.value)
          }}
          />
      </div>
      <button  
        className="btn btn-primary mb-2"
        onClick={() => {
          console.log(inputvalue)
          searchPlaces({ 'query': inputvalue}).then(function(response) {
            console.log('here is places')
            console.log(response.data)
            setplaces(response.data)
            
          })
        }}
      >Search</button>
    </div>

    {places.map((place) => {
      return <Place
              place={place}
              key={place.placeId}
              cities={props.cities}
              user={props.user}
              setCities={props.setCities}
              />
    })}

  </Fragment>
  )
}