import React, {useEffect} from 'react';
import GoogleMapLoader from 'google-maps'

export default function Map() {

  let map = React.createRef();

  useEffect(() => {
    GoogleMapLoader.KEY = 'AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U';
    GoogleMapLoader.load(function(google){

      const targetMap = new google.maps.Map(map.current, {
        center: {lat: 49.246292, lng: -123.116226},
        zoom: 8
      });


      const markerPositions= [
        {lat: 49.246292, lng: -123.116226},
        {lat: 49.267132, lng: -122.968941},
        {lat: 49.166592, lng: -123.133568},
      ]
      //code from here

      markerPositions.map(loc => {
        new google.maps.Marker({
          position: loc,
          map: targetMap,
          title: 'Hello World!'
        });
      })
      // const marker = new google.maps.Marker({
      //   position: myLatLng,
      //   map: targetMap,
      //   title: 'Hello World!'
      // });
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(targetMap);
    
  
    })

  })

  // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U"></script>
  return (
    <>
    <div
      style={{
        height: '500px',
        width: '500px',
      }}
      className='bg-dark'
      ref={map}
    ></div>
    </>
  )
}


