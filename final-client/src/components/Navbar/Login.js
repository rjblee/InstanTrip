import React from 'react';
import userAuthentication from '../../helpers/userAuthentication'


export default function Login(props) {
  return (
    <div className="form-inline my-2 my-lg-0 ml-auto">
      <input 
        className="loginout" 
        type="text" 
        placeholder="Name"
        value={props.name}
        onChange={event => {
          props.setName(event.target.value)
        }}
        />
      <input 
        className="loginout" 
        type="password" 
        placeholder="Password"
        value={props.password}
        onChange={event => {
          props.setPassword(event.target.value)
        }}
        />
      <button 
        className="example_e btn-outline-white btn-md my-2 my-sm-0 ml-3" 
        type="submit"
        onClick= {() => {
          console.log(props)
          userAuthentication({name:props.name, password:props.password}).then((response) => {
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