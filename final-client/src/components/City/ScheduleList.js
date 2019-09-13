import React from 'react';
import AllPlaceItem from './AllPlaceItem';
import SchedulePlaceItem from './SchedulePlaceItem';
import "../../styles/City.css";
import CityPlace from './CityPlace'

export default function ScheduleList (props) {
  return (
    <>
          
        <nav className='scheduleList'>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active wishlist-tab" 
              id="nav-home-tab" 
              data-toggle="tab" 
              href="#nav-home" 
              role="tab"
              aria-controls="nav-home" 
              aria-selected="true"
              style={{ color: 'black'}}
              onClick={() => {
                props.setMegaSteps([])
                props.setSteps([])
                props.setCurrentSchedule({id: 'All', city_id: '', start_place: null, end_place: null, transit: null})
              }}
              >All</a>

            {props.schedules.map((schedule, index) => {
            return <a
              key={schedule.id}
              className="nav-item nav-link wishlist-tab"
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
              >schedule {index + 1}</a>
          })}

          </div>
        </nav>


        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <div className='scroll-all pt-3'>

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

          {props.schedules.map((schedule) => {
            return <div 
                      key={schedule.id}
                      className="tab-pane fade" 
                      id={`nav-schedule-${schedule.id}`} 
                      role="tabpanel" 
                      aria-labelledby={`nav-schedule-tab-${schedule.id}`}>
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

        </div>

    </>
  )
}
