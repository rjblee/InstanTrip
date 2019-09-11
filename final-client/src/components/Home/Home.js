import React, { useState,Fragment } from 'react';
import "../../styles/Home.css";
import Axios from 'axios';
import CityCard from './CityCard';
// import Map from '../City/Map'
export default function Home(props) {
  const [inputvalue, setInputvalue] = useState()

  // console.log('props.cities')
  // console.log(props.cities)

  const handleClick = (event) =>  {
    event.preventDefault()
    // console.log(inputvalue)
   let result = '';
    Axios.post("/searchPlaces", { query: inputvalue}).then(response => {
      Axios.post('/createCity',{city: response.data[0], user: props.user}).then((response) => {
        props.setCities(prev => {return [...prev, response.data]})
      })
    })
  }

  return(
    <div id="home-page-text">
      <h1><b style={{color: 'white'}}>Find Yourself In...</b></h1>
      {/* <h1><b>Your Journey Begins...</b></h1> */}

      <div className="home-search">
        {/* <div className="form-group mx-sm-3 mb-2"> */}
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter City"
            value={inputvalue}
            onChange={event => {
              setInputvalue(event.target.value)
            }}
          />
        <div className="button_cont" align="center">
          <div className="example_e" target="_blank" rel="nofollow noopener" onClick={handleClick} >Create</div>
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
      </div>
      <div >
        <div className="city-cards">
          {props.cities.map((city) => {
            return (<CityCard city={city}/>)
          })}
        </div>
      </div>
    </div>


  )
}