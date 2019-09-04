import React, {Fragment, useState} from 'react';
import searchPlaces from '../../helpers/searchPlaces'
import Place from './Place'
import axios from "axios";
import imageSearch from '../../helpers/imageSearch'

export default function ImageSearch(props) {
  const [inputvalue, setInputvalue] = useState('')
  const [places, setplaces] = useState([])
  const [searchOption, setSearchOption] = useState('image')
  console.log(places)


  return(
  <Fragment>
    <p> here is the imageSearch page</p>
    <div>
      <div className="form-row">
        <div className='col-md-1'></div>
        <div className="form-group col-md-4">
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
        <div className="form-group col-md-1">
          <select 
              className="form-control mr-sm-2" 
              value={searchOption}
              onChange={(event) => {
                setSearchOption(event.target.value)
                console.log(event.target.value)
              }}
              >
              <option defaultValue value='image'>img</option>
              <option value="text">text</option>
            </select>
        </div>

        <div className="form-group col-md-2">
        <button  
            className="btn btn-primary mb-2"
            onClick={() => {
              //send request based on search option
              if (searchOption === 'image') {
                imageSearch(inputvalue,setInputvalue,setplaces)
              } else {
                //text search option
                console.log(inputvalue)
                searchPlaces({ 'query': inputvalue}).then(function(response) {
                  console.log('here is places')
                  console.log(response.data)
                  setplaces(response.data)
                })
              }
            }}
          >Search</button>
        </div>
      </div>
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



//old version
{/* <div className="form-inline">
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

<select 
  className="form-control mr-sm-2" 
  value={searchOption}
  onChange={(event) => {
    setSearchOption(event.target.value)
    console.log(event.target.value)
  }}
  >
  <option defaultValue value='image'>img</option>
  <option value="text">text</option>
</select>
<button  
  className="btn btn-primary mb-2"
  onClick={() => {
    //send request based on search option
    if (searchOption === 'image') {
      //imaga search option
      console.log('oh here is the image search')
      // axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U',
      //             {
      //               "requests": [
      //                   {
      //                     "image": {
      //                       "source": {
      //                         "imageUri":
      //                         "https://lh5.googleusercontent.com/p/AF1QipNpKt0J3dScmimDYngNE9W4S7RqBKG2dcEN2OBl=w408-h306-k-no"
      //                       } 
      //                     },
      //                     "features": [
      //                       {
      //                         "type": "LANDMARK_DETECTION"
      //                       }
      //                     ]
      //                   }
      //               ]
      //             }
      // )

    } else {
      //text search option
      console.log(inputvalue)
      searchPlaces({ 'query': inputvalue}).then(function(response) {
        console.log('here is places')
        console.log(response.data)
        setplaces(response.data)
      })
    }



  }}
>Search</button>
</div> */}
