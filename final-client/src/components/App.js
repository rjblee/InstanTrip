import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home/Home';
import ImageSearch from './ImageSearch/ImageSearch';
import GoogleMap from './GoogleMap';
import Login from './Navbar/Login'
import Logout from './Navbar/Logout'
import getUserData from '../helpers/getUserData'

import City from './City/City'

export default function App() {

  //state for user login
  const [name, setName] =useState('')
  const [password, setPassword] =useState('')
  const [user,setUser] = useState({id:'', name:'' , password:''})
  const [userdata, setUserData] = useState([])
  const [cities, setCities] = useState([])
  const [alert, setAlert] = useState('')
  console.log('----here')
  console.log(cities) 
  console.log(userdata)
  console.log(user)
  useEffect(() => {
    if (user.name) {
      // get all user data from database 
      getUserData(user).then((response) => {
        //get cities 
        const getUniqueCities = function (city, index, self) {
          return self.indexOf(city) === index
        }
        setCities(response.data.map((place) => place.city).filter(getUniqueCities))
        //store user data
        setUserData(response.data)
        console.log(response.data)
      })
    }
  },[user])

  return (
    <Router className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Travel</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <div className="nav-link"><Link to="/">Home</Link></div>
            </li>
            <li className="nav-item">
              <div className="nav-link"><Link to="/imageSearch">Image Search</Link></div>
            </li>
            <li className="nav-item">
              <div className="nav-link"><Link to="/sampleCity">sample city page</Link></div>
            </li>
          </ul>
        </div>
        { user.name ? <Logout
                        user={user}
                        setUser={setUser}
                        setName={setName}
                        setPassword={setPassword}
                        setUserData={setUserData}
                        setCities={setCities}
                      />
                      : 
                      <Login 
                        name={name}
                        setName={setName}
                        password={password}
                        setPassword={setPassword}
                        setUser={setUser}
                        setUserData={setUserData}
                        />}

      </nav>
      
      {alert.length ? <div class="alert alert-danger" role="alert">
        {alert}
      </div> : <></>}
      <Route path="/" exact render={() => <Home/>} />
      <Route path="/imageSearch" exact render={() => <ImageSearch
                                                        cities={cities}
      />}/>
      <Route path="/sampleCity" exact render={() => <City/>} />
      <Route path="/map" exact component={GoogleMap} /> 
      
    </Router>
  );
};
