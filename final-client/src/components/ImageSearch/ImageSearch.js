import React, {Fragment, useState} from 'react';
import searchPlaces from '../../helpers/searchPlaces'

export default function ImageSearch() {
  const [inputvalue, setInputvalue] = useState('')

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
          searchPlaces({ 'query': inputvalue})
        }}
      >Search</button>
    </div>

  </Fragment>
  )
}