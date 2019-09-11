import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home/Home';
import ImageSearch from './ImageSearch/ImageSearch';
// import GoogleMap from './GoogleMap';
import Login from './Navbar/Login'
import Logout from './Navbar/Logout'
import getUserData from '../helpers/getUserData'
import getCities from '../helpers/getCities'
import City from './City/City'

export default function App() {

  //state for user login
  const [name, setName] =useState('')
  const [password, setPassword] =useState('')
  const [user,setUser] = useState({id:'', name:'' , password:''})
  // const [userdata, setUserData] = useState([])
  const [userdata, setUserData] = useState([])
  const [cities, setCities] = useState([])
  const [alert, setAlert] = useState('')

  ////////////////////////////////////
  console.log('----here')
  // console.log(cities) 
  console.log(userdata)
  // console.log(user)
  ////////////////////////////////////
  useEffect(() => {
    if (user.name) {
      // get all user data from database 
      getUserData(user).then((response) => {
        // //get cities 
        // const getUniqueCities = function (city, index, self) {
        //   return self.indexOf(city) === index
        // }

        // const citiesFromDate = response.data.map((place) => { return {city:place.city, lat:place.c_lat, lng:place.c_lng}})
        // const citiesname
        // setCities(response.data.map((place) => { return {city:place.city, lat:place.c_lat, lng:place.c_lng}}).filter(getUniqueCities))
        //store user data
        setUserData(response.data)
        // console.log(response.data)
      } 
      )
      getCities(user).then((response) => {
        setCities(response.data)
      })
    }
  },[user])

  return (
    <Router className="App">
      <nav className="navbar navbar-expand-lg">
        <span className="navbar-logo" ><Link to="/"><b>WeTravel</b></Link></span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-menu">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <div className="nav-link"><Link to="/"><b>Home</b></Link></div>
            </li>
            <li className="nav-item">

              <div className="nav-link"><Link to="/imageSearch">Image Search</Link></div>
            </li>
            <li className="nav-item dropdown">
              {/* <div className="nav-link"><Link to="/sampleCity">Wishlist</Link></div> */}
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <b>City</b>

              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                {cities.map((city) => {
                  return <div className="nav-link"><Link to={"/" + city.city} className="nav-dropdown">{city.city}</Link></div>
                })}
             
{/* 
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a> */}
              </div>
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
                        setAlert={setAlert}
                      />
                      : 
                      <Login 
                        name={name}
                        setName={setName}
                        password={password}
                        setPassword={setPassword}
                        setUser={setUser}
                        setUserData={setUserData}
                        setAlert={setAlert}
                        />}

      </nav>
      
      {alert.length ? <div className="alert alert-danger" role="alert" style={{ position: 'relative'}}>
        {alert}
        <button 
          className='alert alert-danger'
          style={{ position: 'absolute', zIndex: '1', top:'-1px', right:'0px'}}
          onClick={() => {
            setAlert('')
          }}
        >X</button>
      </div> : <></>}

        
      {cities.map( (city) => {
        const places = userdata.filter((place) => {
          return place.city === city.city
        })
        return <Route path={"/" + city.city} exact render={() => <City
          city={city}
          places={places}
          setUser={setUser}
          setAlert={setAlert}
          userdata={userdata}
        />} />
      })}
      
      <Route path="/" exact render={() => <Home
                                            user={user}
                                            cities={cities}
                                            setCities={setCities}
                                            setAlert={setAlert}
                                          />} />
      <Route path="/imageSearch" exact render={() => <ImageSearch
                                                        cities={cities}
                                                        user={user}
                                                        setCities={setCities}
                                                        setUser={setUser}
                                                        setAlert={setAlert}
                                                        userdata={userdata}
                                                      />}/>

      
      <Route path="/sampleCity" exact render={() => <City
                                                      city={{
                                                        c_lat: "49.246292",
                                                        c_lng: "-123.116226",
                                                        c_picture: "https://lh3.googleusercontent.com/p/AF1QipMY2PblrieyoxW-CyVSLa8AS6EGuKQOzAHIshdj=s1600-w200",
                                                        city: "Vancouver",
                                                        id: 1,
                                                        user_id: 1
                                                      }}


                                                      cities={cities}
                                                      user={user}
                                                      setCities={setCities}
                                                      places={userdata}
                                                      setAlert={setAlert}
                                                      setUser={setUser}
                                                    />} />
      {/* <Route path="/map" exact component={GoogleMap} /> */}
      
    </Router>
  );
};
