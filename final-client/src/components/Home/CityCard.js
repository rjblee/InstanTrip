import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import City from '../City/City'

export default function CityCard(props) {

    const style = {
      backgroundImage: `url(${props.city.c_picture})`,
      width: '200px',
      height: '200px',
      backgroundSize: 'cover', 
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    }
    console.log('citycard')
    console.log(props.city)
  return (
    <div 
      style = {style}
    >
        <Link to={"/" + props.city.city}>{props.city.city}</Link>

    </div>
  )
}