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
        <p>Name: {props.place.name}</p>
        <p>Address: {props.place.address}</p>
        <p>Rating: {props.place.rating}</p>
         <input 
          className="wishlist-dropdown"
          type="text" 
          name="targetCity" 
          list="targetCity"
          placeholder="Wishlist"
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
          className="example_d"
          onClick={() => {
            savePlaceToDatabase(props, targetCity)
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
        >Add to Wishlist</button>
        
      </div>
    </div>
  )
}
