import React, { useState} from 'react';
import searchPlaces from '../../helpers/searchPlaces';
import imageSearch from '../../helpers/imageSearch'

export default function SearchBar (props) {
  const [inputvalue, setInputvalue] = useState('')
  const [searchOption, setSearchOption] = useState( props.defaultValue || 'image')
  const setplaces = props.setplaces
  return (
    <div className="left-half-city-search">
    <div className="search-for-place">
      <div className='col-md-1'></div>

      <div className="city-page-search-bar col-md-4">
        <input 

              type="text" 
              className="form-control" 
              placeholder="Search Place by Using URL"
              value={inputvalue}
              onChange={event => {
                setInputvalue(event.target.value)
              }}
        />
      </div>
      <div className="form-group col-md-1">
        <select 
            className="form-control mr-sm-2" 
            value={searchOption}
            onChange={(event) => {
              setSearchOption(event.target.value)
              console.log(event.target.value)
            }}
            >
            <option defaultValue value='image'>📷</option>
            <option value="text">📝</option>

          </select>
      </div>

      <div className="form-group col-md-2">
      <button  
          className="example_e"
          onClick={() => {
            //send request based on search option
            if (searchOption === 'image') {
              imageSearch(inputvalue,setInputvalue,setplaces, props.setAlert)
            } else {
              //text search option
              const queryData = { 'query': inputvalue}
              if (props.city) {
                queryData['location'] = {lat: props.city.c_lat, lng: props.city.c_lng}
              }
              // console.log('query data ----')
              // console.log(queryData)
              console.log(inputvalue)
              // searchPlaces({ 'query': inputvalue}).then(function(response) {
              searchPlaces(queryData).then(function(response) {
                console.log(props)
                props.setAlert('')
                console.log('here is places')
                console.log(response.data)
                if(response.data.length) {
                  setplaces(response.data)
                } else {
                  props.setAlert('No places found')
                }
              })
            }
          }}
        >Search</button>
      </div>
    </div>
  </div>

  )
}