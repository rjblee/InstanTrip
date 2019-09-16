import React, { useState } from 'react';
import updateSchedule from '../../helpers/updateSchedule'
import "../../styles/City.css";

export default function StartEndTransitForm (props) {
  const [start, setStart] = useState(props.currentSchedule.start_place || 'Starting Location...')
  const [end, endStart] = useState(props.currentSchedule.end_place || 'End Location...')
  const [transit, setTransit] = useState(props.currentSchedule.transit || 'Travel method..')

  const places = props.places.filter((place) => {
    return place.schedule_id === props.currentSchedule.id
  })

  return (
    <div className="row">
      <div className="col-1"></div>

      <div className="form-group col-3"> 
        <select 
          className="form-control"
          value={start}
          onChange={(event) => {
            setStart(event.target.value)
          }}
          >
            
            <option>Starting Location...</option>
            {places.map((place) => {
              return <option key={place.id} value={place.name}>{place.name}</option>
            })}
        </select>
      </div>

      <div className="form-group col-3">
        <select 
          className="form-control"
          value={end}
          onChange={(event) => {
            endStart(event.target.value)
          }}
          >
          <option>End Location...</option>
          {places.map((place) => {
              return <option key={place.id} value={place.name}>{place.name}</option>
          })}
        </select>
      </div>

      <div className="form-group col-3">
        <select className="form-control"
          value={transit}
          onChange={(event) => {
            setTransit(event.target.value)
          }}
        >
            <option value={null}>Travel method...</option>
            <option value='car'>Car</option>
            <option value='transit'>Transit</option>
        </select>
      </div>

      <div className="form-group col-1">
        <button 
          className="form-control"
          onClick={() => {
            props.setSteps([])
            props.setTargetMap([])
            updateSchedule(props.currentSchedule.id, start, end, transit, props.setSchedules).then(response => {
              const newSchedule = response.data
              props.setSchedules(prev => {
                const otherSchedules = prev.filter(each => {
                  return each.id !== newSchedule.id
                })
                return [...otherSchedules, newSchedule]
              })
              props.setCurrentSchedule(newSchedule)
            })

          }

          }
          >START JOURNEY</button>
      </div>
      <div className="col-1"></div>
    </div>
  )
}