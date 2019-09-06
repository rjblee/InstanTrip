import React, { useState } from 'react';
import "../../styles/Home.css";

import Axios from 'axios';

export default function Home(props) {
  const [inputvalue, setInputvalue] = useState()

  const handleClick = (event) =>  {
    event.preventDefault()
    // console.log(inputvalue)
   let result = '';
    Axios.post("/searchPlaces", { query: inputvalue}).then(response => {
      Axios.post('/createCity',{city: response.data[0], user: props.user}).then((response) => {
        console.log(response)
      })
      // console.log('response------11111')
      // console.log(response.data[0])
      // console.log(props.user)
      
    })
   

  }


import CityCard from './CityCard'

export default function Home(props) {
  console.log('props.cities')
  console.log(props.cities)


  return(
    <div className="home-page">
      {/* <h1><b>Find Yourself In...</b></h1> */}
      <h1><b>Your Journey Begins...</b></h1>
    <div className="home-search">
      {/* <div className="form-group mx-sm-3 mb-2"> */}
        <input 
          type="text" 
          className="form-control" 
          placeholder="Create City"
          value={inputvalue}
          onChange={event => {
            setInputvalue(event.target.value)
          }}
        />
      <div className="button_cont" align="center">
        <a class="example_e" href="/sampleCity" target="_blank" rel="nofollow noopener" onClick={handleClick} >Create</a>
      </div>
      {/* </div> */}
      {/* <button  
        className="btn btn-primary mb-2"
        onClick={() => {
          console.log(inputvalue)
          searchPlaces({ 'query': inputvalue}).then(function(response) {
            console.log('here is places')
            console.log(response.data)
            setplaces(response.data)
          })
        }}
      >Search</button> */}

    <div>
    {props.cities.map((city) => {
      return (<CityCard city={city}/>)
    })}
    </div>
    </div>
  </div>

  )
}