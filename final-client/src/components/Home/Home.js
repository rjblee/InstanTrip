import React, { useState,Fragment } from 'react';
import "../../styles/Home.css";
import Axios from 'axios';
import CityCard from './CityCard';
export default function Home(props) {
  const [inputvalue, setInputvalue] = useState()


  const handleClick = (event) =>  {
    Axios.post("/searchPlaces", {query: inputvalue}).then(response => {
      const cityName = response.data[0].name

      const exitCity = props.cities.filter((city) => {
        return city.city == cityName
      })
      props.setAlert('')

      if (exitCity.length === 0) {

        Axios.post('/cities',{city: response.data[0], user: props.user}).then((response) => {
          props.setCities(prev => {return [...prev, response.data]})
        })

      } else {
        props.setAlert('city already exist')
      }
    })

  }


  return(
    <div id="home-page-text">
      <h1><b style={{color: 'white'}}>Find Yourself In...</b></h1>

      <div className="home-search">
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
          <button className="example_e" target="_blank" rel="nofollow noopener" onClick={handleClick} >Create</button>
        </div>
      </div>
      <div >
        <div className="city-cards">
          {props.cities.map((city) => {
            return (<CityCard key={city.id} city={city}/>)
          })}
        </div>
      </div>
    </div>


  )
}