import React, {useState,useEffect} from 'react'

function App() {
  const [data, setData] = useState([{}])
  const titles=["Database address:","Database user:","Database name:","Database table:","GoogleSheet ID:", "Update delay:"]
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

  return (
    <div>
      <div>
        <a>NUMBERS</a>
      </div>
      <div>
        <a>SCRIPT CONFIG:</a>
        {(typeof data.configures==='undefined')
        ? (<p>Loading..</p>)
        : (data.configures.map((config, i)=>(<div key={i}><a>{titles[i]}</a> <a>{config}</a></div>)))}
      </div>
      <div>
        <a>EXECUTION:</a>
        <div><a>Run</a> <a>Stop</a></div>
        <a>Execution status: </a>
      </div>
    </div>
  )
}

export default App