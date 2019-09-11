import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import City from '../City/City'
import "../../styles/Home.css";

export default function CityCard(props) {

    const style = {
      backgroundImage: `url(${props.city.c_picture})`,
      // width: '300px',
      // height: '300px',
      // backgroundSize: 'cover', 
      // backgroundPosition: 'center center',
      // backgroundRepeat: 'no-repeat',
    }
    console.log('citycard')
    console.log(props.city)
  return (
    <div className="city-card" style = {style}>
      <div>
        <Link to={"/" + props.city.city} style={{color: 'white'}}><b>{props.city.city}</b></Link>
      </div>
    </div>
  )
}