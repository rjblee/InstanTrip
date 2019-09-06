import axios from "axios";
import kmeans from 'node-kmeans'

export default function createAndSaveSchecules (places, kValue, city, setUser) {

  //process place data for k mean clustering
  const cityVector = places.map((place) => {
    return [place.lat, place.lng]
  })



  // pass K-mean model with processed city data and k value

  kmeans.clusterize(cityVector, {k: kValue}, (err,res) => {
    if (err) {
      //output error if any
      console.error(err)
    } else {
      // get index value of cities in each cluster
      const clusters = res.map((cluster) => {
        return cluster.clusterInd
      })
      // console.log('clusters123123123')
      // console.log(clusters)

      // transfer array of city index value into real city data
      const placesClusters = clusters.map(cluster => {
        return cluster.map(each => { return  places[each]})
      })

      // send axios request with cityId and cityclusters
      axios.post('/saveSchedules', {placesClusters: placesClusters, cityId: city.id}).then((response) => {
        // use setUser to trigger data relode
        setUser(prev => {return prev})
      })

    }})


}