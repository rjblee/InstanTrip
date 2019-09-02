import React, {Component} from 'react';
import Map from './Map';


class GoogleMap extends Component {
  render(){
  return (
    
    <div style= {{ margin : '100px'}}>
    <Map 
        google = {this.props.google}
        center = {{lat:49.2274622, lng: -122.9999852}}
        height='300px'
        zoom={15}
        />
  </div>
  );
  }
};
export default GoogleMap;