import React, {useState} from 'react';
import Wishlist from "./Wishlist";
import "../../styles/City.css";
import Map from './Map';
import SearchBar from '../SearchBar/searchBar'
import createAndSaveSchecules from '../../helpers/createAndSaveSchecules'

export default function City(props) {
  const [foundPlaces, setfoundPlaces] = useState([])

  console.log('city-----------')
  console.log(props.city)
  console.log(props.places)

  console.log('result from kMeanClustering')

  // const clusters = kMeanClustering(props.places, 2)

  // console.log('cluster123123-------------')
  // console.log(clusters)
  // const cityClusters = clusters.map(cluster => {
  //   return cluster.map(each => { return props.places[each]})
  // })
  // console.log('cityClusters')
  // console.log(cityClusters)
  // saveSchedules(123).then(response => {
  //   console.log(response.data)
  // })


  createAndSaveSchecules(props.places, 2)




  return(
    <>
      <p> here is the city page</p>
      <SearchBar setplaces={setfoundPlaces} city={props.city}/>
      <Wishlist></Wishlist>

      {/* <Map></Map> */}
    </>


  )
}
