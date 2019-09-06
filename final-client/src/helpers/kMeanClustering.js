import kmeans from 'node-kmeans'

export default function kMeanClustering (places, kValue) {
  // console.log('check for k mean')
  // console.log(kmeans)
  
  // process city lat lng database before passing to K-mean clustering

  const cityVector = places.map((place) => {
    return [place.lat, place.lng]
  })
  // console.log('city vectors ------')
  // console.log(cityVector)


  // pass K-mean model with processed city data and k value
  let resultClusters = ''
  kmeans.clusterize(cityVector, {k: kValue}, (err,res) => {
    if (err) {
      console.error(err)
    } else {

      resultClusters = res.map((cluster) => {
        return cluster.clusterInd
      })




    }
  });
  // console.log('resultClusters')
  // console.log(resultClusters)
  // return resultClusters
}