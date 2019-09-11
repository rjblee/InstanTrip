import axios from "axios";
import qs from 'qs'
import searchPlaces from '../helpers/searchPlaces'

export default function SavePlaceToDatabase(props, targetCity, setUser) {
  const savePlace = function(data) {
    const options = {
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: '/savePlace'
    }
    return (
      axios(options)
    ) 
  }
  
  // check if city is in city list
  console.log('check citys')
  console.log(targetCity)
  console.log(props.cities)
  let selectedCity =''
  console.log(selectedCity.length == false)

  if (props.cities) {
    selectedCity = props.cities.filter((city) => {
      return city.city == targetCity
    })
  } else {
    selectedCity = [targetCity]
  }
  console.log(selectedCity)
  
  if (selectedCity.length) {
    // if yes, send city data with place data directly
    console.log(selectedCity[0])
    savePlace({place: props.place, city: selectedCity[0], existCity: 'true'}).then((response) => {
      console.log(response)
      setUser(prev => ({...prev}))
    })
  } else {

    // else find the city, create citiy and add place to that city in database
    searchPlaces({ 'query': targetCity}).then((response) => {
      console.log('city from no where')
      console.log(response.data)
      console.log(props.user)
      // let data = {user: props.user, place: props.place, city: response.data[0], existCity: 'false'}
      // console.log('data')
      // console.log(data)
      savePlace({user: props.user, place: props.place, city: response.data[0], existCity: 'false'}).then((response) => {
        // use setUser to trigger useEffect in app.js to update cities
        console.log('i want the citiy here!!')
        console.log(response.data)
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