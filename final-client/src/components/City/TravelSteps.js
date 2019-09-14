import React, { useState} from 'react';
import { Steps } from 'antd';
import 'antd/dist/antd.css';
import "../../styles/City.css";



const { Step } = Steps;
const stepStyle = {
  marginBottom: 60,
  boxShadow: '0px -1px 0 0 #e8e8e8 inset',
  background: 'white',
};
export default function TravelSteps(props) {
  const [current, setCurrent] = useState(0);
  const wayPoints = props.megaSteps.map((step) => {
    const startName = props.places.filter((places) => {
      return places.address.substring(0, 10) === step.start_address.substring(0, 10)
    })[0]

    const endName = props.places.filter((places) => {
      return places.address.substring(0, 10) === step.end_address.substring(0, 10)
    })[0]

    // some address might not have match address
    step['startName'] = startName ?  startName.name : step.start_address
    step['endName'] = endName ? endName.name:  step.end_address
    return step
  })


  const wayPoinstWithDuration = wayPoints.map((wayPoint) => {
    const targetStep = props.steps.filter((step) => {
      if (wayPoint.start_address.substring(0, 10) === step.start_address.substring(0, 10)) {
        return true
      } else {
        return false
      }
    })[0]
    wayPoint['distance'] = targetStep ? targetStep.distance.text : null
    wayPoint['duration'] = targetStep ? targetStep.duration.text : null
    return wayPoint
  })

  
  const lastRoute = wayPoinstWithDuration[wayPoinstWithDuration.length-1]
    return (
 
      <div className= 'steps'>
        <Steps type="navigation" current={current}  
        onChange = {current => {
            setCurrent(current);
          }
        } 
        style={stepStyle}>
          {wayPoinstWithDuration.map((wayPoint) => {
            return <Step 
                    status="finish" 
                    title={wayPoint.startName} 
                    description={`Travel Time: ${wayPoint.duration} Distance: ${wayPoint.distance}`}
                    onClick={() => {
                      props.targetMap.setCenter({lat: wayPoint.start_location.lat(), lng: wayPoint.start_location.lng()})
                      props.targetMap.setZoom(15)
                    }}
                    />
          })
          }
          
          {<Step 
            status="finish" 
            title={lastRoute.endName} 
            description={`Final destination`} 
            onClick={() => {
            props.targetMap.setCenter({lat: lastRoute.end_location.lat(), lng: lastRoute.end_location.lng()})
            props.targetMap.setZoom(15)
          }}/>}


        </Steps>
      </div>
    );
}





