import React from 'react';
import "../../styles/App.css";

export default function Logout(props) {
  return (
    <>
      <span className="welcome white-text">
        <b>Welcome, {props.user.name}</b>
      </span>
      <button 
      className="example_e btn-outline-white btn-md my-2 my-sm-0 ml-3" 
      type="submit"
      onClick= {() => {
        props.setUser({name:'', password:''})
        props.setName('')
        props.setPassword('')
        props.setUserData([])
        props.setCities([])
        props.setAlert('')
      }}
      >Logout</button>
    </>
  )
}