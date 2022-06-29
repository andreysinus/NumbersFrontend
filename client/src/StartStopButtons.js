import "./App.css"
import React, {useState,useEffect} from 'react'
import axios from "axios";
export default function StartStopButtons(props) {
    
const [dataExec,setDataExec] = useState([{}])
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
    this.setState({});
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
    
    const isActive = props.runned==props.runX;
    const isActive2 = 0 == props.runX;
    const btnClass = "script-text";
    function updateClick(){
        if (isActive2==true) { stopScript()} else{startScript()}
        
    }
    return (
                <button className={btnClass} onClick={ updateClick}>{isActive2 ? "Stop": "Run"}</button>
    )
    
}
