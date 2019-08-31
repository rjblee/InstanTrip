import React from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './home';
// import GoogleApiWrapper from './GoogleApiWrapper';
import ImageSearch from './imageSearch';
import test from './test';

import Hey from './Hey';
import City from './city/city'

export default function App() {
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
      </nav>
      
      <Route path="/" exact component={Home} />
      <Route path="/imageSearch" exact component={ImageSearch} />
      {/* <Route path="/sampleCity" exact component={GoogleApiWrapper} /> */}
      <Route path="/hey" exact component={Hey} />

      <Route path="/test" exact component={test} />
      
    </Router>
  );
};
