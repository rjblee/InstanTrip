import axios from "axios";
import kmeans from 'node-kmeans'

export default function createAndSaveSchecules (places, kValue, city, setSchedules, setUser) {

  //process place data for k mean clustering
  const cityVector = places.map((place) => {
    return [place.lat, place.lng]
  })

  let convertedKValue = parseInt(kValue) || 1
  convertedKValue = cityVector.length > convertedKValue ? convertedKValue: cityVector.length


  // pass K-mean model with processed city data and k value
  kmeans.clusterize(cityVector, {k: convertedKValue}, (err,res) => {
    if (err) {
      //output error if any
      console.error(err)
    } else {
      // get index value of cities in each cluster
      const clusters = res.map((cluster) => {
        return cluster.clusterInd
      })
      const placesClusters = clusters.map(cluster => {
        return cluster.map(each => { return  places[each]})
      })

      // send axios request with cityId and cityclusters
      axios.post('/schedules', {placesClusters: placesClusters, cityId: city.id}).then((response) => {
        axios.get(`/city/${city.id}/schedules`).then(response => {
          setSchedules(response.data)
          setUser(prev => ({...prev}))
        })
        
      })

    }})


}