import React, {useState,useEffect} from 'react'
import "./App.css"
import axios from "axios";



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
  function startScript(){
    axios({
      method: "GET",
      url:"/startscript",
    })
    .then((response) => {
      const res =response.data
      setDataExec(({
        profile_name: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
    }
    function stopScript(){
      axios({
        method: "GET",
        url:"/stopscript",
      })
      .then((response) => {
        const res =response.data
        setDataExec(({
          profile_name: res.about}))
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
      }
  return (
    <div >
      <div className='title-text'>
        <a>NUMBERS</a>
      </div>
      <div className='screen-container'>
        <div>
          <a className='title2-text'>SCRIPT CONFIG:</a>
          {(typeof data.configures==='undefined')
          ? (<p className='main-text'>Loading..</p>)
          : (data.configures.map((config, i)=>(<div key={i} className="mgBTM10"><a className='main-text'>{titles[i]}</a> <a className='submain-text'>{config}</a></div>)))}
        </div>
        <div className='mgBTM20'>
          <a className='title2-text'>EXECUTION:</a>
          <div className='mgBTM10'><button className='script-text' onClick={startScript}>Run</button> <button className='script-text active' onClick={stopScript}>Stop</button></div>
          <div> <a className='main-text'>Execution status: </a>
                {dataExec && <div> 
                  <a className='submain-text'>{dataExec.profile_name}</a>
                </div> } 
          </div>
        </div>
      </div>
    </div>
  )
}

export default App