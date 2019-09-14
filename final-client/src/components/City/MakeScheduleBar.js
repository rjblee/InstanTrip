import React, { useState } from 'react';
import createAndSaveSchecules from '../../helpers/createAndSaveSchecules'

export default function MakeScheduleBar(props) {
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
        className="example_e btn-primary mb-2"
        onClick={() => {
          createAndSaveSchecules(props.places, kValue, props.city, props.setSchedules, props.setUser)
          props.setMegaSteps([])
          props.setSteps([])
          setKValue('')
        }}
      >Make Schedule</button>
    </div>
  )
}