import axios from "axios";
import qs from 'qs'
import searchPlaces from '../helpers/searchPlaces'

export default function SavePlaceToDatabase(props, targetCity, setUser) {
  const savePlace = function(data) {
    const options = {
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: '/places'
    }
    return (
      axios(options)
    ) 
  }
  
  // check if city is in city list
  let selectedCity =''

  if (props.cities) {
    selectedCity = props.cities.filter((city) => {
      return city.city == targetCity
    })
  } else {
    selectedCity = [targetCity]
  }
  
  if (selectedCity.length) {
    // if yes, send city data with place data directly
    savePlace({place: props.place, city: selectedCity[0], existCity: 'true'}).then((response) => {
      setUser(prev => ({...prev}))
    })
  } else {
    // else find the city, create citiy and add place to that city in database
    searchPlaces({ 'query': targetCity}).then((response) => {
      savePlace({user: props.user, place: props.place, city: response.data[0], existCity: 'false'}).then((response) => {
        // use setUser to trigger useEffect in app.js to update cities
        props.setCities((prev) => {return [
          ...prev,
          response.data
        ]
        })
        setUser(prev => ({...prev}))

      })
    })
  }
}