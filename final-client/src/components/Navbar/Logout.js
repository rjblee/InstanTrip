import React, { useState, Fragment } from 'react';

export default function Logout(props) {
  return (
    <Fragment>
      <span className="navbar-text white-text">
        Welcome, {props.user.name}
      </span>
      <button 
      className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" 
      type="submit"
      onClick= {() => {
        props.setUser({name:'', password:''})
        props.setName('')
        props.setPassword('')
        props.setUserData([])
        props.setCities([])
      }}
      >Logout</button>
    </Fragment>
  )
}