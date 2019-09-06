import axios from "axios";
import qs from 'qs'
import kmeans from 'node-kmeans'

export default function createAndSaveSchecules (places, kValue) {
  const cityVector = places.map((place) => {
    return [place.lat, place.lng]
  })
  // console.log('city vectors ------')
  // console.log(cityVector)


  // pass K-mean model with processed city data and k value

  kmeans.clusterize(cityVector, {k: kValue}, (err,res) => {
    if (err) {
      console.error(err)
    } else {
      // get index value of cities in each cluster
      const resultClusters = res.map((cluster) => {
        return cluster.clusterInd
      })
      console.log('resultClusters123123123')
      console.log(resultClusters)


      

    }})



  // const options = {
  //   method: 'post',
  //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
  //   data: qs.stringify(data),
  //   url: '/saveSchedules'
  // }
  // return (
  //   axios(options)
  // )



}