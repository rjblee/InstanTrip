import React, {useEffect} from 'react';
import GoogleMapLoader from 'google-maps'

export default function Map(props) {
  const lat = parseFloat(props.lat) || 49.246292;
  const lng = parseFloat(props.lng) || -123.116226;
  let map = React.createRef();
  const currentSchedule = props.currentSchedule
  // console.log("EEEEEEE",props)

  console.log('places in map')
  console.log(props.places)

  useEffect(() => {
    GoogleMapLoader.KEY = 'AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U';
    GoogleMapLoader.load(function(google){
      const targetMap = new google.maps.Map(map.current, {
        center: {lat: lat, lng: lng},
        zoom: 13
      });


    const bounds = new google.maps.LatLngBounds()

    const markerPositions = props.places.map((place) => {
      
      const loc = new google.maps.LatLng(parseFloat(place.lat), parseFloat(place.lng))
      bounds.extend(loc)
      // new google.maps.Marker({
      //   position: {lat: parseFloat(place.lat), lng: parseFloat(place.lng)},
      //   map: targetMap,
      //   title: place.name
      // })
      return {lat: parseFloat(place.lat), lng: parseFloat(place.lng)}

    })



    targetMap.fitBounds(bounds)
    targetMap.panToBounds(bounds)

    
      // const markerPositions= [
      //   {lat: lat, lng: lng},
      //   {lat: lat, lng: lng},

      //   {lat: 49.246292, lng: -123.116226},
      //   {lat: 49.267132, lng: -122.968941},
      //   {lat: 49.166592, lng: -123.133568},
      //   {lat:49.2384, lng:-123.0318},
      //   {lat:49.2483,lng:-123.0559}
      //   ]
      // code from here


      // maker
      // markerPositions.map(loc => {
      //   new google.maps.Marker({
      //     position: loc,
      //     map: targetMap,
      //     title: 'Hello World!'
      //   });
      // })

      // const marker = new google.maps.Marker({
      //   position: myLatLng,
      //   map: targetMap,
      //   title: 'Hello World!'
      // });



      //route
      if (currentSchedule.start_place && currentSchedule.end_place && currentSchedule.transit) {

        console.log('---------------in routes now')

        const start_place = props.places.filter((place) => {
          return place.name === currentSchedule.start_place
        }).map((place) => {
          return {lat: parseFloat(place.lat), lng: parseFloat(place.lng)}
        })[0]

        const end_place = props.places.filter((place) => {
          return place.name === currentSchedule.end_place
        }).map((place) => {
          return {lat: parseFloat(place.lat), lng: parseFloat(place.lng)}
        })[0]

        console.log(start_place)
        console.log(markerPositions[0])

        const waypoints = props.places.filter((place) => {
          if (place.name !== currentSchedule.start_place && place.name !== currentSchedule.end_place) {
            return true
          } else {
            return false
          }
        }).map((place) => {
          return {
            location: {lat: parseFloat(place.lat), lng: parseFloat(place.lng)},
            stopover: true
          }
        })

        console.log(waypoints)
            // var trafficLayer = new google.maps.TrafficLayer();
            // trafficLayer.setMap(targetMap);
  
        //     var waypoints = [
        //       {
        //         location: {lat: 49.166592, lng: -123.133568},
        //         stopover: true
        //     },
        //     {
        //       location: {lat:49.2384, lng:-123.0318},
        //       stopover: true
        //   },
  
  
        // //     {
        // //       location: {lat:49.2483,lng:-123.0559},
        // //       stopover: true
        // // }  
        //     ];


            var directionsDisplay = new google.maps.DirectionsRenderer;
            var directionsService = new google.maps.DirectionsService;
            directionsDisplay.setMap(targetMap);
            
            calculateAndDisplayRoute(directionsService, directionsDisplay);
            // document.getElementById('mode').addEventListener('change', function() {
            //     calculateAndDisplayRoute(directionsService, directionsDisplay);
            //   });
  
              function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                // var selectedMode = mode.current.value;
                // const mode = 'DRIVING'

                directionsService.route({
                  origin: start_place, 
                  destination: end_place, 
                  waypoints: waypoints, //an array of waypoints
                  optimizeWaypoints: true,
                  travelMode: 'DRIVING'
                  // google.maps.TravelMode[selectedMode],
                  // transitOptions: {
                  //   departureTime: new Date(Date.now() + 100000),
                  //   modes: ['BUS'],
                  //   routingPreference: 'FEWER_TRANSFERS'
                  // }
                  
                }, function(response, status) {
                  const megaSteps = response.routes[0].legs;
                  props.setMegaSteps(megaSteps)

                  if (status == 'OK') {
                    if (currentSchedule.transit === "car") {
                      
                      // const directionsDisplay = new google.maps.DirectionsRenderer; //
                      // directionsDisplay.setMap(targetMap); //
                      // directionsDisplay.setDirections(response);


                      // // const steps = response.routes[0].legs
                      // var infowindow2 = new google.maps.InfoWindow();
                      // infowindow2.setContent(response.routes[0].legs[0].distance.text + "<br>" + response.routes[0].legs[0].duration.text + " ");
                      // // infowindow2.setPosition({lat: 49.166592, lng: -123.133568});
                      // infowindow2.open(targetMap);

                      // const directionsDisplay = new google.maps.DirectionsRenderer;
                      // directionsDisplay.setMap(targetMap);
                      // directionsDisplay.setDirections(response);

                      // const center_point = response.routes[0].overview_path.length/2;
                      // response.routes[0].legs.map((leg) => {
                      //   const infowindow2 = new google.maps.InfoWindow();
                      //   infowindow2.setContent(leg.distance.text + "<br>" + leg.duration.text + " ");
                      //   infowindow2.setPosition(response.routes[0].overview_path[center_point|0]);
                      //   infowindow2.open(targetMap);
                      // })
                      // console.log( ' show me steps data')
                      // console.log(response.routes[0])
                      // console.log('steps ssss-')
                      // console.log(steps)
                      
                      const steps = response.routes[0].legs
                      steps.forEach (step => {
                        const start_address = step.start_address
                        const end_address = step.end_address
                        directionsService.route({
                          origin: start_address, 
                          destination: end_address, 
                          // origin: {lat: step.start_location.lat(), lng: step.start_location.lng()}
                          // origin: {lat: step.start_location.lat(), lng: step.start_location.lng()}
                          travelMode: 'DRIVING'
                        }, function (response, status) {
                          if (status == 'OK') {
                            const start_location =  response.routes[0].legs[0].start_location
                            const end_location =  response.routes[0].legs[0].end_location
                            // console.log(response.routes[0].legs[0].start_location.lat())
                            const directionsDisplay = new google.maps.DirectionsRenderer;
                            directionsDisplay.setMap(targetMap);
                            directionsDisplay.setDirections(response);
                            var center_point = response.routes[0].overview_path.length/2;
                            const infowindow2 = new google.maps.InfoWindow();
                            infowindow2.setContent(response.routes[0].legs[0].distance.text + "<br>" + response.routes[0].legs[0].duration.text + " ");
                            infowindow2.setPosition(response.routes[0].overview_path[center_point|0]);
                            infowindow2.open(targetMap);
                            props.setSteps(prev => {
                              return [...prev, response.routes[0].legs[0]]
                            })
                          } else {
                            console.log('oh wrong')
                          }
                        })
  
                      })
                    } else {
                      const steps = response.routes[0].legs
                      
                      steps.forEach (step => {
                        const start_address = step.start_address
                        const end_address = step.end_address
                        directionsService.route({
                          origin: start_address, 
                          destination: end_address, 
                          // waypoints: waypoints, //an array of waypoints
                          // optimizeWaypoints: true,
                          travelMode: 'TRANSIT',
                          // google.maps.TravelMode[selectedMode],
                          transitOptions: {
                            departureTime: new Date(Date.now() + 100000),
                            modes: ['BUS'],
                            routingPreference: 'FEWER_TRANSFERS'
                          }
                        }, function (response, status) {
                          
                          if (status == 'OK') {
                            const start_location =  response.routes[0].legs[0].start_location
                            const end_location =  response.routes[0].legs[0].end_location
                            // console.log(response.routes[0].legs[0].start_location.lat())
                            const directionsDisplay = new google.maps.DirectionsRenderer;
                            directionsDisplay.setMap(targetMap);
                            directionsDisplay.setDirections(response);
                            var center_point = response.routes[0].overview_path.length/2;
                            const infowindow2 = new google.maps.InfoWindow();
                            infowindow2.setContent(response.routes[0].legs[0].distance.text + "<br>" + response.routes[0].legs[0].duration.text + " ");
                            infowindow2.setPosition(response.routes[0].overview_path[center_point|0]);
                            infowindow2.open(targetMap);
  
                          } else {
                            console.log('oh wrong')
                          }
                        })
  
                      })
                    }
                  } else {
                    window.alert('Directions request failed due to ' + status);
                  }
                });
  
              }
      } else {
        props.places.map((place) => {
          // const loc = new google.maps.LatLng(parseFloat(place.lat), parseFloat(place.lng))
          // bounds.extend(loc)
          new google.maps.Marker({
            position: {lat: parseFloat(place.lat), lng: parseFloat(place.lng)},
            map: targetMap,
            title: place.name
          })
        })
      }
    })

  }, [props.currentSchedule])

  //<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U"></script>
  return (
    <>
    <div
      style={{

        height: '600px',
        width: '100%',

      }}
      className='bg-dark'
      ref={map}
    

    ></div>
    </>
  )
}


