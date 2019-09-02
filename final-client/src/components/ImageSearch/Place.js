import React, {Fragment, useState} from 'react';


export default function Place(props) {
  const [targetCity, setTargetCity] = useState('')
  console.log(targetCity)
  // const [newCity, setNewCity] = userState('')
  return (
    <div className="placeCard d-flex">
      <img className="placeImage" src={props.place.picture}></img>
      <div>
        <p>name: {props.place.name}</p>
        <p>address: {props.place.address}</p>
        <p>rating: {props.place.rating}</p>

         <input 
          type="text" 
          name="city" 
          list="citynames"
          placeholder="Choose target city"
          value= {targetCity}
          onChange ={event => {
            setTargetCity(event.target.value)
          }}
          />
         <datalist 
          id="citynames"
          value={targetCity}
          onchange={event => {
            setTargetCity(event.target.value)
          }}
         >
           {props.cities.map( (item) => {
            return <option>{item}</option>
          })}
         </datalist>

        <button>Add to Wishlist</button>
      </div>
    </div>
  )
}
// need wish list     
// need botton



// address: "4700 Kingsway, Burnaby, BC V5H 4N2, Canada"
// lat: 49.2274622
// lng: -122.9999852
// name: "Metropolis at Metrotown"
// picture: "https://lh3.googleusercontent.com/p/AF1QipMm9Ae9bmHQQ4RvSJ9Mi28fJcBrOFU-PZZgIXwi=s1600-w200"
// placeId: "ChIJB7RfXFl2hlQRpb-Vv0SYE3A"
// rating: 4.3