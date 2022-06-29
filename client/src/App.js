import React, {useState,useEffect, Component} from 'react'
import "./App.css"
import axios from "axios";
import StartStopButtons from './StartStopButtons';


function App() {
  
  const [data, setData] = useState([{}])
  const [dataExec,setDataExec] = useState([{}])
  const titles=["Database address:","Database user:","Database name:","Database table:","GoogleSheet ID:", "Update delay (sec):"]
  useEffect(()=>{
    fetch("/config").then(
      res=>res.json()
    ).then(
      data=>{
        setData(data)
        console.log(data)
      }
    )
  }, [])

      const [param,setParam] = useState([{}])
      useEffect(()=>{
        fetch("/param").then(
          res=>res.json()
        ).then(
          data=>{
            setParam(data)
            console.log(data)
          }
        )
      }, [])
      const isActive2=param.params==0

  return (
    <div >
      <div>
        <a className='title-text'>NUMBERS<a className='submain2-text'> TEST TASK</a><a className='submain3-text'> made by andrey petrov</a></a>
        
      </div>
      <div className='screen-container'>
        <div>
          <a className='title2-text'>SCRIPT CONFIG:</a>
          {(typeof data.configures==='undefined')
          ? (<p className='main-text'>Loading..</p>)
          : (data.configures.map((config, i)=>(<div key={i} className="mgBTM10"><a className='main-text'>{titles[i]}</a> <a className='submain-text'>{config}</a></div>)))}
        </div>
        <div className='mgBTM20'>
          <a className='title2-text'>EXECUTION: </a>
          <div className=''><StartStopButtons title="Run" runned={param.params} runX="1"/> <StartStopButtons title="Stop" runned={param.params}  runX="0"/>  </div>
        </div>
        
      </div>

    </div>
  )
}

export default App