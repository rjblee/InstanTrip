import React, {useEffect} from 'react';
import GoogleMapLoader from 'google-maps'

export default function Map(props) {
  const lat = parseInt(props.lat) || 49.246292;
  const lng = parseInt(props.lng) || -123.116226;
  let map = React.createRef();
  // console.log("EEEEEEE",props)

  useEffect(() => {
    GoogleMapLoader.KEY = 'AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U';
    GoogleMapLoader.load(function(google){

     
      const targetMap = new google.maps.Map(map.current, {
        center: {lat: lat, lng: lng},
        zoom: 8,
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
                      color: "#92b4c2"
                  },
                  {
                      visibility: "on"
                  }
              ]
          }
      ]
      });
    
      // map.mapTypes.set('styled map', styledMapType);
      // map.setMapTypeId('styled map');

      const markerPositions= [
        // {lat: lat, lng: lng},
        // {lat: lat, lng: lng},

        {lat: 49.246292, lng: -123.116226},
        {lat: 49.267132, lng: -122.968941},
        {lat: 49.166592, lng: -123.133568},
        {lat:49.2384, lng:-123.0318},
        {lat:49.2483,lng:-123.0559}
        ]
      //code from here


      //maker
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



      //route
      
      // var trafficLayer = new google.maps.TrafficLayer();
      // trafficLayer.setMap(targetMap);
      var waypoints = [
        {
          location: {lat: 49.166592, lng: -123.133568},
          stopover: true
      },
      {
        location: {lat:49.2384, lng:-123.0318},
        stopover: true
    },
  //     {
  //       location: {lat:49.2483,lng:-123.0559},
  //       stopover: true
  // }  
      ];
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;
      directionsDisplay.setMap(targetMap);
     
      calculateAndDisplayRoute(directionsService, directionsDisplay);
      // document.getElementById('mode').addEventListener('change', function() {
      //     calculateAndDisplayRoute(directionsService, directionsDisplay);
      //   });

        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
          // var selectedMode = mode.current.value;
          const mode = 'DRIVING'
          directionsService.route({
            origin: markerPositions[0], 
            destination: markerPositions[1], 
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
            
            if (status == 'OK') {
              if (mode === "DRIVING") {
                directionsDisplay.setDirections(response);
                var center_point = response.routes[0].overview_path.length/2;
                var infowindow2 = new google.maps.InfoWindow();
                infowindow2.setContent(response.routes[0].legs[0].distance.text + "<br>" + response.routes[0].legs[0].duration.text + " ");
                infowindow2.setPosition(response.routes[0].overview_path[center_point|0]);
                infowindow2.open(targetMap);
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
                      console.log('oh wrongg')
                    }
                  })

                })
              }
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });

        }
    })

  })

  //<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U"></script>
  return (
    <>
    <div
      style={{

        height: '600px',
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


