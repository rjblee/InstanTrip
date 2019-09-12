import React, {useEffect} from 'react';
import GoogleMapLoader from 'google-maps'

export default function Map(props) {

  const lat = parseFloat(props.lat) || 49.246292;
  const lng = parseFloat(props.lng) || -123.116226;
  console.log('lat, lng')
  console.log(lat)
  console.log(lng)
  let map = React.createRef();
  const currentSchedule = props.currentSchedule
  // console.log("EEEEEEE",props)

  console.log('places in map')
  console.log(props.places)
  useEffect(() => {
    GoogleMapLoader.KEY = 'AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U';
    GoogleMapLoader.load(function(google){
      console.log('places in map')
      console.log(props.places)


      const targetMap = new google.maps.Map(map.current, {
        center: {lat: lat, lng: lng},
        zoom: 9,
        styles: [
          {
              featureType: "administrative",
              elementType: "labels.text.fill",
              stylers: [
                  {
                      color: "#393939"
                  }
              ]
          },
          {
              featureType: "landscape.natural",
              elementType: "geometry.fill",
              stylers: [
                  {
                      color: "#aacfa8"
                  }
              ]
          },
          {
              featureType: "poi",
              elementType: "all",
              stylers: [
                  {
                      visibility: "off"
                  }
              ]
          },
          {
              featureType: "road",
              elementType: "all",
              stylers: [
                  {
                      saturation: -100
                  },
                  {
                      lightness: "4"
                  },
                  {
                      gamma: "0.46"
                  },
                  {
                      visibility: "on"
                  }
              ]
          },
          {
              featureType: "road",
              elementType: "labels",
              stylers: [
                  {
                      visibility: "on"
                  },
                  {
                      saturation: "-15"
                  },
                  {
                      lightness: "69"
                  },
                  {
                      gamma: "0.31"
                  }
              ]
          },
          {
              featureType: "road.highway",
              elementType: "all",
              stylers: [
                  {
                      visibility: "simplified"
                  }
              ]
          },
          {
              featureType: "road.highway",
              elementType: "labels",
              stylers: [
                  {
                      visibility: "off"
                  },
                  {
                      saturation: "-100"
                  },
                  {
                      lightness: "-22"
                  },
                  {
                      gamma: "0.08"
                  },
                  {
                      weight: "0.01"
                  },
                  {
                      invert_lightness: true
                  }
              ]
          },

          {
              featureType: "road.arterial",
              elementType: "labels.icon",
              stylers: [
                  {
                      visibility: "off"
                  },
                  {
                      lightness: "19"
                  }
              ]
          },
          {
              featureType: "transit",
              elementType: "all",
              stylers: [
                  {
                      visibility: "off"
                  }
              ]
          },
          {
              featureType: "water",
              elementType: "all",
              stylers: [
                  {
                      color: "#116fa2"
                  },
                  {
                      visibility: "on"
                  }
              ]
          }

      ]})


      //pass map object out of <Map>
      props.setTargetMap(targetMap)

      // map.mapTypes.set('styled map', styledMapType);
      // map.setMapTypeId('styled map');

    const bounds = new google.maps.LatLngBounds()

    props.places.forEach((place) => {
      const loc = new google.maps.LatLng(parseFloat(place.lat), parseFloat(place.lng))
      bounds.extend(loc)
      new google.maps.Marker({
        position: {lat: parseFloat(place.lat), lng: parseFloat(place.lng)},
        map: targetMap,
        title: place.name
      })

      // return {lat: parseFloat(place.lat), lng: parseFloat(place.lng)}
    })

    // const addMarker = function(lat, lng, name) {
    //   new google.maps.Marker({
    //     position: {lat: parseFloat(lat), lng: parseFloat(lng)},
    //     map: targetMap,
    //     title: name
    //   })
    // }
    // console.log('marker in map')
    // console.log(addMarker)



  //   props.setAddMarker({addMarker: 
  //     function(lat, lng, name) {
  //       new google.maps.Marker({
  //         position: {lat: parseFloat(lat), lng: parseFloat(lng)},
  //         map: targetMap,
  //         title: name
  //       })
  //     }
  // })

    props.setAddMarker([function(lat, lng, name) {
      new google.maps.Marker({
        position: {lat: parseFloat(lat), lng: parseFloat(lng)},
        map: targetMap,
        title: name
      })
    }])



    // props.setAddMarker(() => { return function(lat, lng, name) {
    //   new google.maps.Marker({
    //     position: {lat: parseFloat(lat), lng: parseFloat(lng)},
    //     map: targetMap,
    //     title: name
    //   })
    // } })




    // targetMap.fitBounds(bounds)
    // targetMap.panToBounds(bounds)

    
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

        const markerPositions = props.places.map((place) => {
      
          // const loc = new google.maps.LatLng(parseFloat(place.lat), parseFloat(place.lng))
          // bounds.extend(loc)
          // new google.maps.Marker({
          //   position: {lat: parseFloat(place.lat), lng: parseFloat(place.lng)},
          //   map: targetMap,
          //   title: place.name
          // })
          return {lat: parseFloat(place.lat), lng: parseFloat(place.lng)}
    
        })

        console.log('---------------in routes now')

        const start_place = props.places.filter((place) => {
          return place.name === currentSchedule.start_place
        }).map((place) => {
          // return {lat: parseFloat(place.lat), lng: parseFloat(place.lng)}
          return place.address
        })[0]

        const end_place = props.places.filter((place) => {
          return place.name === currentSchedule.end_place
        }).map((place) => {
          // return {lat: parseFloat(place.lat), lng: parseFloat(place.lng)}
          return place.address
        })[0]

        // console.log(start_place)
        // console.log(markerPositions[0])


        const waypoints = props.places.filter((place) => {
          if (place.name !== currentSchedule.start_place && place.name !== currentSchedule.end_place) {
            return true
          } else {
            return false
          }
        }).map((place) => {
          console.log('make sure if place address')
          console.log(place)
          return {
            // location: {lat: parseFloat(place.lat), lng: parseFloat(place.lng)},
            location: place.address,
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

                  // travelMode: 'TRANSIT'
                  // google.maps.TravelMode[selectedMode],
                  // transitOptions: {
                  //   departureTime: new Date(Date.now() + 100000),
                  //   modes: ['BUS'],
                  //   routingPreference: 'FEWER_TRANSFERS'
                  // }
                  
                }, function(response, status) {
                  const megaSteps = response.routes[0].legs;
                  props.setMegaSteps(megaSteps)
                  // const startlatLng = {lat: megaSteps[0].start_location.lat(), lng: megaSteps[0].start_location.lng()}

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
                      props.setSteps(prev => {
                        return []
                      })
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
                            
                            // //set center
                            // google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
                            // // ... CALLBACK
                            // console.log('set center called')
                            // targetMap.setCenter({lat: 49.246292, lng: -123.116226})
                            // targetMap.setZoom(12)
                            // });
                            directionsDisplay.setOptions( { suppressMarkers: true } );
                            directionsDisplay.setDirections(response);
                            var center_point = response.routes[0].overview_path.length/2;
                            const infowindow2 = new google.maps.InfoWindow();
                            // infowindow2.setContent(response.routes[0].legs[0].duration.text);
                            // infowindow2.setPosition(response.routes[0].overview_path[center_point|0]);
                            // infowindow2.open(targetMap);
                            props.setSteps(prev => {
                              return [...prev, response.routes[0].legs[0]]
                            })

                            // set the center to be the beginning of the journey
                            // targetMap.setCenter(startlatLng)
                            // targetMap.setZoom(12)

                          } else {
                            console.log('oh wrong')
                          }
                          // targetMap.fitBounds(bounds)
                          // targetMap.panToBounds(bounds)
                        })
  
                      })

                      console.log('time out!')
                      setTimeout(function(){                           
                        targetMap.fitBounds(bounds)
                        targetMap.panToBounds(bounds) 
                      }, 1000);
                      
                    } else {
                      const steps = response.routes[0].legs
                      props.setSteps(prev => {
                        return []
                      })
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
                            
                            // //set center
                            // google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
                            //   // ... CALLBACK
                            //   console.log('set center called')
                            //   targetMap.setCenter({lat: 49.246292, lng: -123.116226})
                            //   targetMap.setZoom(12)
                            // });
                            directionsDisplay.setOptions( { suppressMarkers: true } );
                            directionsDisplay.setDirections(response);
                            var center_point = response.routes[0].overview_path.length/2;
                            const infowindow2 = new google.maps.InfoWindow();
                            // infowindow2.setContent(response.routes[0].legs[0].duration.text);
                            // infowindow2.setPosition(response.routes[0].overview_path[center_point|0]);
                            // infowindow2.open(targetMap);
                            props.setSteps(prev => {
                              return [...prev, response.routes[0].legs[0]]
                            })

                            // set the center to be the beginning of the journey
                            // targetMap.setCenter(startlatLng)
                            // targetMap.setZoom(12)
                          } else {
                            console.log('oh wrong')
                          }
                          targetMap.fitBounds(bounds)
                          targetMap.panToBounds(bounds)
                        })
                      })
                      console.log('time out!')
                      setTimeout(function(){                           
                        targetMap.fitBounds(bounds)
                        targetMap.panToBounds(bounds) 
                      }, 1000);


                    }
                  } else {
                    window.alert('Directions request failed due to ' + status);
                  }
                });
  
              }
      } else {
        const bounds = new google.maps.LatLngBounds()

        if (props.places.length != 0) {

          props.places.forEach((place) => {
            const loc = new google.maps.LatLng(parseFloat(place.lat), parseFloat(place.lng))
            bounds.extend(loc)
            new google.maps.Marker({
              position: {lat: parseFloat(place.lat), lng: parseFloat(place.lng)},
              map: targetMap,
              title: place.name
            })
            return {lat: parseFloat(place.lat), lng: parseFloat(place.lng)}
          })
          targetMap.fitBounds(bounds)
          targetMap.panToBounds(bounds)
          
        }

        // props.places.map((place) => {
          
        //   // const loc = new google.maps.LatLng(parseFloat(place.lat), parseFloat(place.lng))
        //   // bounds.extend(loc)
        //   new google.maps.Marker({
        //     position: {lat: parseFloat(place.lat), lng: parseFloat(place.lng)},
        //     map: targetMap,
        //     title: place.name
        //   })

        //   targetMap.fitBounds(bounds)
        //   targetMap.panToBounds(bounds)
        // })

      }
    })
  }, [props.currentSchedule])

  //<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U"></script>
  return (
    <>
    <div
      style={{

        height: '700px',
        width: '100%',
        border:'12px solid white',
        borderRadius: '10px'

      }}
      className='bg-dark'
      ref={map}
    

    ></div>
    </>
  )
}


