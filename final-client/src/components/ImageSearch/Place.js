import React, { useState} from 'react';
import savePlaceToDatabase from '../../helpers/savePlaceToDatabase'
import "../../styles/ImageSearch.css";

export default function Place(props) {
  const [targetCity, setTargetCity] = useState('')
  // console.log(targetCity)
  // console.log('citiys----------')
  // console.log(props.cities)
  return (
    
    <div className="placeCard d-flex">
      <img className="placeImage" src={props.place.picture} alt=''></img>
      <div>
        <p><b>{props.place.name}</b></p>
        <p>{props.place.address}</p>
         <input 
          className="wishlist-dropdown"
          type="text" 
          name="targetCity" 
          list="targetCity"
          placeholder="Add place to City"
          value= {targetCity}
          onChange ={event => {
            setTargetCity(event.target.value)
          }}
          />
         <datalist 
          id="targetCity"
          value={targetCity}
          onChange={event => {
            setTargetCity(event.target.value)
          }}
         >
           {props.cities.map( (item) => {
            return <option
                    key={item.id}
                    >{item.city}</option>
          })}
         </datalist>

        <button
          className="example_g"
          onClick={() => {
            props.setAlert('')
            // check if place is in database already
            const placeName = props.place.name
            // console.log('placeName')
            // console.log(placeName)
            // console.log(props.userdata)
            const filteredPlaces = props.userdata.filter((each) => {
              return each.name === placeName
            })

            if (filteredPlaces.length === 0 ) {
              savePlaceToDatabase(props, targetCity, props.setUser)
            } else {
              props.setAlert('Failed to save place. Check if you are signed in and place is not in wishlist already')
            }



            // function savePlace(data) {
            //   const options = {
            //     method: 'post',
            //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
            //     data: qs.stringify(data),
            //     url: '/savePlace'
            //   }
            //   return (
            //     axios(options)
            //   ) 
            // }

            // // check if city is in city list
            // const selectedCity = props.cities.filter((city) => {
            //   return city.city == targetCity
            // })

            // if (selectedCity.length) {
            //   // if yes, send city data with place data directly
            //   savePlace({place: props.place, city: selectedCity[0], existCity: 'true'}).then((response) => {
            //     console.log(response)
            //   })
            // } else {
            //   // else find the city, create citiy and add place to that city in database
            //   searchPlace({ 'query': targetCity}).then((response) => {
            //     console.log('city from no where')
            //     console.log(response.data)
            //     console.log(props.user)
            //     // let data = {user: props.user, place: props.place, city: response.data[0], existCity: 'false'}
            //     // console.log('data')
            //     // console.log(data)
            //     savePlace({user: props.user, place: props.place, city: response.data[0], existCity: 'false'}).then((response) => {
            //       console.log(response)
            //     })
            //   })
            // }

        }}
        >Add to City</button>
        
      </div>
    </div>
   
  )
}
