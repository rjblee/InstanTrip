import React, { useState } from 'react';
import createAndSaveSchecules from '../../helpers/createAndSaveSchecules'
export default function ScheduleForm (props) {
  const [kValue, setKValue] = useState('')

  return (
    <div className="form-inline">
      <div className="form-group mx-sm-3 mb-2">
        <input 
          type="text" 
          className="form-control" 
          placeholder={`Days in ${props.city.city}`}
          value={kValue}
          onChange={(event) => {
            setKValue(event.target.value)
          }}
          />
      </div>
      <button 
        type="submit" 
        className="btn btn-primary mb-2"
        onClick={() => {
          // function takes place data, k value to do clustering 
          // and then  city id to  create row in schedules table
          // and add schedule id into schedule_id colume of places table
          // then update data by calling setUser(prev => {return prev})
          createAndSaveSchecules(props.places, kValue, props.city, props.setSchedules)
        }}
      >Make Schedule</button>
    </div>
  )
}