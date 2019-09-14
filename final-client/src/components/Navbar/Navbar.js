import React, { useState } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login'
import Logout from './Logout'

export default function Navbar(props) {
  const [name, setName] =useState('')
  const [password, setPassword] =useState('')
  
  
  return (
    <nav className="navbar navbar-expand-lg">
    <span className="navbar-logo" ><Link to="/"><b>InstanTrip</b></Link></span>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbar-menu">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <div className="nav-link"><Link to="/"><b>Home</b></Link></div>
        </li>
        <li className="nav-item">

          <div className="nav-link"><Link to="/imageSearch"><b>Image Search</b></Link></div>
        </li>
        <li className="nav-item dropdown">
          {
            // eslint-disable-next-line
          }<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <b>City</b>
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            {props.cities.map((city) => {
              return <div key={city.id} className="nav-link"><Link to={"/" + city.city} className="nav-dropdown">{city.city}</Link></div>
            })}
         
          </div>
        </li>
      </ul>
    </div>
    { props.user.name ? <Logout
                    user={props.user}
                    setUser={props.setUser}
                    setName={setName}
                    setPassword={setPassword}
                    setUserData={props.setUserData}
                    setCities={props.setCities}
                    setAlert={props.setAlert}
                  />
                  : 
                  <Login 
                    name={name}
                    setName={setName}
                    password={password}
                    setPassword={setPassword}
                    setUser={props.setUser}
                    setUserData={props.setUserData}
                    setAlert={props.setAlert}
                    />}

  </nav>

  )
}