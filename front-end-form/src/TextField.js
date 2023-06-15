import React from 'react'
import { useState } from 'react'

const TextField = ({socket, jobId, invoiceId, disableFields, fieldKey}) => {

    const [data, setData] = useState("")
    

    if(socket && socket.current){
      socket.current.on(fieldKey, (data) => {
        setData(data.changedValue)
      })
    }
    

    const handleChange = (e) => {
        setData(e.target.value)
        try{
          socket && socket.current && socket.current.emit("valChanged", { jobId: jobId, invId:invoiceId,timeStamp: Date.now(), user:"Sb", initialValue: data, changedValue:e.target.value, field:fieldKey })
        }
        catch(e){
            console.log("Web socket error", e)
        }
    }

  return (
    <input onChange={handleChange} value={disableFields ? "disabled" : data} />
  )
  
}

export default TextField