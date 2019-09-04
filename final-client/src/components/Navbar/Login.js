import React, { useState } from 'react';
import userAuthentication from '../../helpers/userAuthentication'


export default function Login(props) {

  return (
    <div className="form-inline my-2 my-lg-0 ml-auto">
    <input 
      className="form-conpostposttrol mr-2" 
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
      placeholder="Password"
      value={props.password}
      onChange={event => {
        props.setPassword(event.target.value)
      }}
      />
    <button 
      className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" 
      type="submit"
      onClick= {() => {
        userAuthentication({name:props.name, password:props.password}).then((response) => {
          console.log('---get user from database')
          console.log(response)
          if (response.data.length) {
            props.setUser(response.data[0])
            props.setAlert('')
          } else {
            props.setAlert('Wrong username or password')
          }
        })
      }}
      >Login</button>
  </div>
  )
}