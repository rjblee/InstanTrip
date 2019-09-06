import React, {useState} from 'react';
import Wishlist from "./Wishlist";
import "../../styles/City.css";
import Map from './Map';
import SearchBar from '../SearchBar/searchBar'
import createAndSaveSchecules from '../../helpers/createAndSaveSchecules';
import Demo from './Step'

export default function City(props) {

  const [foundPlaces, setfoundPlaces] = useState([])


  // console.log('city-----------')
  // console.log(foundPlaces)
  // console.log(props.places)


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


  // createAndSaveSchecules(props.places, 2)


  // let lng;
  // let lat;

  // if (foundPlaces.length > 0) {
  //   lng = foundPlaces[0].lng
  //   lat = foundPlaces[0].lat
  // }

  return(
    <>
      <p> here is the city page</p>
      <SearchBar setplaces={setfoundPlaces} city={props.city}/>
      
      <div>
           <div class="row">
           <div class="col-1" ></div>
            <div class="col-6">
            <Map></Map>
            </div>
            <div class="col-4">
            <Wishlist></Wishlist>
            </div>
            <div class="col-1" ></div>
          </div>
      </div>
      <div><Demo /></div>
   
       
          
        
    </>


  )
}
