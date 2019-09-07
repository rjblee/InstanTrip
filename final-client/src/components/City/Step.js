
import React, { useState} from 'react';
import { Steps } from 'antd';
import 'antd/dist/antd.css';


const { Step } = Steps;
const stepStyle = {
  marginBottom: 60,
  boxShadow: '0px -1px 0 0 #e8e8e8 inset',
  background: 'white'
};
export default function Demo() {
  const [current, setCurrent] = useState(0);
  // onChange = current => {
  //   console.log('onChange:', current);
  //   setCurrent(current);
  // };
    return (
      <div className='col-10'>
        {/* <Steps
          type="navigation"
          size="small"
          current={current}
          onChange = {current => {
            console.log('onChange:', current);
            setCurrent(current);
          }
        }
          style={stepStyle}
        >
          <Step
            title="Canada Place"
            subTitle="00:00:05"
            status="finish"
            description="Do I want to go there?"
          />
          <Step
            title="Step 2"
            subTitle="00:01:02"
            status="process"
            description="This is a description."
          />
          <Step
            title="Step 3"
            subTitle="waiting for longlong time"
            status="wait"
            description="This is a description."
          />
        </Steps> */}
        <Steps type="navigation" current={current}  
        onChange = {current => {
            // console.log('onChange:', current);
            setCurrent(current);
          }
        } 
        style={stepStyle}>
          <Step status="finish" title="Step 1" />
          <Step status="process" title="Step 2" />
          <Step status="wait" title="Step 3" />
          <Step status="wait" title="Step 4" />
        </Steps>
        {/* <Steps
          type="navigation"
          size="small"
          current={current}
          onChange = {current => {
            console.log('onChange:', current);
            setCurrent(current);
          }
        }
                  style={stepStyle}
        >
          <Step status="finish" title="finish 1" />
          <Step status="finish" title="finish 2" />
          <Step status="process" title="current process" />
          <Step status="wait" title="wait" disabled />
        </Steps> */}
      </div>
    );
}





