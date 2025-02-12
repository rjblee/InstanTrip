import React from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../styles/Home.css";

export default function CityCard(props) {

    const style = {
      backgroundImage: `url(${props.city.c_picture})`,
    }
  return (
    <div className="city-card" style = {style}>
      <div>
        <Link to={"/" + props.city.city} style={{color: 'white'}}><b>{props.city.city}</b></Link>
      </div>
    </div>
  )
}