import React from 'react';
import AllPlaceItem from './AllPlaceItem';
import SchedulePlaceItem from './SchedulePlaceItem'

export default function ScheduleList (props) {
  console.log('props.places-1-1-1-1-1')
  console.log(props.places)
  console.log(props.schedules)
  
  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
          {props.schedules.map((schedule) => {
            return <a  
              key={schedule.id}className="nav-item nav-link" 
              id={`nav-schedule-tab-${schedule.id}`} 
              data-toggle="tab" 
              href={`#nav-schedule-${schedule.id}`} 
              role="tab" 
              aria-controls={`nav-schedule-${schedule.id}`} 
              aria-selected="false">schedule {schedule.id}</a>
          })}
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          {props.places.map((place) => {
            return <AllPlaceItem
              key={place.id}
              place={place}
              schedules={props.schedules}
              setUser={props.setUser}
            />
          })}
        </div>

        {props.schedules.map((schedule) => {
            return <div 
                      key={schedule.id}
                      className="tab-pane fade" 
                      id={`nav-schedule-${schedule.id}`} 
                      role="tabpanel" 
                      aria-labelledby="nav-schedule-tab">
              here is {schedule.id}
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
          })}

        
      </div>
    </>
  )
}
