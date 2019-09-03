import React, { useState } from 'react';

export default function Login(props) {

  return (
    <div className="form-inline my-2 my-lg-0 ml-auto">
    <input 
      className="form-control mr-2" 
      type="text" 
      placeholder="Name"
      value={props.name}
      onChange={event => {
        props.setName(event.target.value)
      }}
      />
    <input 
      className="form-control" 
      type="password" 
      placeholder="password"
      value={props.password}
      onChange={event => {
        props.setPassword(event.target.value)
      }}
      />
    <button 
      className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" 
      type="submit"
      onClick= {() => {
        props.setUser({name:props.name, password:props.password})
      }}
      >Login</button>
  </div>
  )
}