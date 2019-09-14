import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home/Home';
import ImageSearch from './ImageSearch/ImageSearch';
import getUserData from '../helpers/getUserData'
import getCities from '../helpers/getCities'
import City from './City/City'
import { ToastContainer } from "react-toastify";
import Navbar from './Navbar/Navbar'


export default function App() {
  const [user,setUser] = useState({id:'', name:'' , password:''})
  const [userdata, setUserData] = useState([])
  const [cities, setCities] = useState([])
  const [alert, setAlert] = useState('')

  useEffect(() => {
    if (user.name) {
      getUserData(user.id).then((response) => {
        setUserData(response.data)
      } 
      )
      getCities(user).then((response) => {
        setCities(response.data)
      })
    }
  },[user])

  return (
    <Router className="App">
 
       <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Navbar
        cities={cities}
        user={user}
        setUser={setUser}
        setUserData={setUserData}
        setCities={setCities}
        setAlert={setAlert}
      />
      
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
        return <Route key={city.id} path={"/" + city.city} exact render={() => <City
          key={city.id}
          city={city}
          places={places}
          setUser={setUser}
          setAlert={setAlert}
          userdata={userdata}
          user={user}
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
    </Router>
  );
};
