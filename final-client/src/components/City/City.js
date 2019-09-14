import React, {useState, useEffect} from 'react';
import "../../styles/City.css";
import Map from './Map';
import axios from "axios";
import SearchBar from '../SearchBar/searchBar'
import StartEndTransitForm from './StartEndTransitForm'
import TravelSteps from './TravelSteps'
import CityPlace from './CityPlace'
import ScheduleList from './ScheduleList'
import MakeScheduleBar from './MakeScheduleBar'

export default function City(props) {
  const [schedules, setSchedules] = useState([])
  const [foundPlaces, setfoundPlaces] = useState([])
  const [currentSchedule, setCurrentSchedule] = useState({id: 'All', city_id: '', start_place: null, end_place: null, transit: null})
  const [steps,setSteps] = useState([])
  const [megaSteps, setMegaSteps] = useState([])
  const [targetMap, setTargetMap] = useState({})
  const [addMarker, setAddMarker] = useState([])

  useEffect( () => { 
    if(props.city.id) {
      axios.get(`/city/${props.city.id}/schedules`).then(response => {
        setSchedules(response.data)
      })
    }
  },[])

  return(
    <>
      <div className="combine-two-search-bar">
        <SearchBar
          setplaces={setfoundPlaces}
          city={props.city}
          setMegaSteps={setMegaSteps}
          setSteps={setSteps}
          setAlert={props.setAlert}
            defaultValue='text'
        />
        <MakeScheduleBar
          city={props.city}
          setMegaSteps={setMegaSteps}
          setSteps={setSteps}
          places={props.places}
          setSchedules={setSchedules}
          setUser={props.setUser}
        />

     </div>

      <div className="mb-5">
        <div className="row">
          <div className="col-1" ></div>
          <div className="col-6">
            <Map
            places={props.places.filter((place) => {
              if (currentSchedule.id === "All") {
                return true
              } else {
                return place.schedule_id === currentSchedule.id
              }
            })}
            currentSchedule={currentSchedule}
            lat={props.city.c_lat}
            lng={props.city.c_lng}
            setMegaSteps={setMegaSteps}
            setSteps={setSteps}
            setTargetMap = {setTargetMap}
            setAddMarker={setAddMarker}
           />

          </div>
          <div className="col-4 scheduleListParent" style={{ position: 'relative'}}>
          
          {foundPlaces.length ?  
            <div className="scroll-all"
              style={{ position: 'absolute', zIndex: '1', height:'100%', width: '100%', backgroundColor: "rgb(245,245,245)"}}
            >
              <button
                className="btn btn-danger"
                style={{ position: 'absolute', zIndex: '1', top:'5px', left: '5px', borderRadius:'15px'}}
                onClick={() => {
                  setfoundPlaces([])
                }}
              >
                X
              </button>

              <div className="scroll-all">
                {foundPlaces.map((place) => {
                  return <CityPlace
                          place={place}
                          key={place.placeId}
                          city={props.city}
                          user={props.user}
                          setCities={props.setCities}
                          setUser={props.setUser}
                          setAlert={props.setAlert}
                          userdata={props.userdata}
                          setCurrentSchedule={setCurrentSchedule}
                          addMarker={addMarker}
                          />
                })}
              </div> 
            </div>
            : <></>
          }

            <ScheduleList
              places={props.places}
              schedules={schedules}
              setUser={props.setUser}
              setCurrentSchedule={setCurrentSchedule}
              setMegaSteps={setMegaSteps}
              setSteps={setSteps}
              foundPlaces={foundPlaces}
              setfoundPlaces={setfoundPlaces}
              city={props.city}
            />

          </div>
          <div className="col-1" ></div>
        </div>
    </div>

    <StartEndTransitForm
      currentSchedule = {currentSchedule}
      setCurrentSchedule = {setCurrentSchedule}
      places={props.places}
      setSchedules={setSchedules}
      setSteps={setSteps}
      setTargetMap = {setTargetMap}
    />

    {steps.length === megaSteps.length && megaSteps.length ? 
      <div className="row">
        <div className="col-1" ></div>
        <div className="col-10">
          <TravelSteps
          steps={steps}
          megaSteps={megaSteps}
          places={props.places}
          targetMap={targetMap}
          />
        </div>


          <div className="col-1" ></div>
  
      </div>

      : <div></div>
    }
    </>
  )
}
