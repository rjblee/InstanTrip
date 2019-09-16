import React, {useEffect} from 'react';
import GoogleMapLoader from 'google-maps'

// load .env data into process.env
const APIKey = process.env.REACT_APP_GoogleAPIKey
export default function Map(props) {

  const lat = parseFloat(props.lat) || 49.246292;
  const lng = parseFloat(props.lng) || -123.116226;
  let map = React.createRef();
  const currentSchedule = props.currentSchedule

  useEffect(() => {
    GoogleMapLoader.KEY = APIKey;
    GoogleMapLoader.load(function(google){


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

    props.setTargetMap(targetMap)

    const bounds = new google.maps.LatLngBounds()

    props.places.forEach((place) => {
      const loc = new google.maps.LatLng(parseFloat(place.lat), parseFloat(place.lng))
      bounds.extend(loc)
      new google.maps.Marker({
        position: {lat: parseFloat(place.lat), lng: parseFloat(place.lng)},
        map: targetMap,
        title: place.name
      })
    })

    props.setAddMarker([function(lat, lng, name) {
      new google.maps.Marker({
        position: {lat: parseFloat(lat), lng: parseFloat(lng)},
        map: targetMap,
        title: name
      })
    }])

      if (currentSchedule.start_place && currentSchedule.end_place && currentSchedule.transit) {

        const start_place = props.places.filter((place) => {
          return place.name === currentSchedule.start_place
        }).map((place) => {
          return place.address
        })[0]

        const end_place = props.places.filter((place) => {
          return place.name === currentSchedule.end_place
        }).map((place) => {
          return place.address
        })[0]

        const waypoints = props.places.filter((place) => {
          if (place.name !== currentSchedule.start_place && place.name !== currentSchedule.end_place) {
            return true
          } else {
            return false
          }
        }).map((place) => {
          return {
            location: place.address,
            stopover: true
          }
        })

        let directionsService = new google.maps.DirectionsService(); //
        calculateAndDisplayRoute(directionsService);
  
        function calculateAndDisplayRoute(directionsService) {

          directionsService.route({
            origin: start_place, 
            destination: end_place, 
            waypoints: waypoints, 
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
          }, function(response, status) {
            const megaSteps = response.routes[0].legs;
            props.setMegaSteps(megaSteps)

            if (status === 'OK') {
              if (currentSchedule.transit === "car") {
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
                    travelMode: 'DRIVING'
                  }, function (response, status) {
                    if (status === 'OK') {
                      const directionsDisplay = new google.maps.DirectionsRenderer(); //

                      directionsDisplay.setMap(targetMap);
                      directionsDisplay.setOptions( { suppressMarkers: true } );
                      directionsDisplay.setDirections(response);
                      props.setSteps(prev => {
                        return [...prev, response.routes[0].legs[0]]
                      })

                    } else {
                    }
                  })
                })

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
                    travelMode: 'TRANSIT',
                    transitOptions: {
                      departureTime: new Date(Date.now() + 100000),
                      modes: ['BUS'],
                      routingPreference: 'FEWER_TRANSFERS'
                    }
                  }, function (response, status) {
                    
                    if (status === 'OK') {
                      const directionsDisplay = new google.maps.DirectionsRenderer(); //

                      directionsDisplay.setMap(targetMap);
                      directionsDisplay.setOptions( { suppressMarkers: true } );
                      directionsDisplay.setDirections(response);
                      props.setSteps(prev => {
                        return [...prev, response.routes[0].legs[0]]
                      })
                    } else {
                    }
                    targetMap.fitBounds(bounds)
                    targetMap.panToBounds(bounds)
                  })
                })
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

        if (props.places.length !== 0) {
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
      }
    })
  // eslint-disable-next-line
  }, [props.currentSchedule])

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


