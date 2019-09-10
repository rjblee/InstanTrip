import React from 'react';
import AllPlaceItem from './AllPlaceItem';
import SchedulePlaceItem from './SchedulePlaceItem';
import "../../styles/City.css";
import CityPlace from './CityPlace'

export default function ScheduleList (props) {
  // console.log('props.places-1-1-1-1-1')
  // console.log(props.places)
  // console.log(props.schedules)
  // setCurrentSchedule
  return (
    <>
      <nav className='scheduleList'> 

        <div className="nav nav-tabs" id="nav-tab" role="tablist">

          <a className="nav-item nav-link active"
              id="nav-home-tab" data-toggle="tab" 
              href="#nav-home" role="tab" 
              aria-controls="nav-home" 
              aria-selected="false"
              style={{ color: 'black'}}
              onClick={() => {
                props.setMegaSteps([])
                props.setSteps([])
                props.setCurrentSchedule({id: 'All', city_id: '', start_place: null, end_place: null, transit: null})
              }}
              >All</a>
             
          {props.schedules.map((schedule) => {
            return <a  
              key={schedule.id}className="nav-item nav-link" 
              id={`nav-schedule-tab-${schedule.id}`} 
              data-toggle="tab" 
              href={`#nav-schedule-${schedule.id}`} 
              role="tab"
              style={{ color: 'black'}}
              aria-controls={`nav-schedule-${schedule.id}`} 
              aria-selected="false"
              onClick={() => {
                props.setMegaSteps([])
                props.setSteps([])
                props.setCurrentSchedule(schedule)
              }}
              >schedule {schedule.id}</a>
          })}
          
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <div className='scroll-all'>
          {props.places.map((place) => {
            return <AllPlaceItem
              key={place.id}
              place={place}
              schedules={props.schedules}
              setUser={props.setUser}
            />
          })}
          </div>
        </div>
        {/* <div className='scroll-schedule'> */}
        {props.schedules.map((schedule) => {
            return <div 
                      key={schedule.id}
                      className="tab-pane fade" 
                      id={`nav-schedule-${schedule.id}`} 
                      role="tabpanel" 
                      aria-labelledby="nav-schedule-tab">
                    <div className='scroll-all'>
                      {props.places.filter((place) => {
                        return place.schedule_id == schedule.id
                      })
                      .map((place) => {
                        return <SchedulePlaceItem
                                key={place.id}
                                place={place}
                                setUser={props.setUser}
                                />
                      })
                      }
                    </div>
                
              </div>
          })}
        {/* </div> */}
          


        
        
      </div>
    </>
  )
}
