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
          name="tragetCity" 
          list="targetCity"
          placeholder="Choose target city"
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

        <button>Add to Wishlist</button>
        
      </div>
    </div>
  )
}
