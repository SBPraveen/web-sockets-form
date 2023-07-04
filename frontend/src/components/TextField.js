import React, { useEffect, useState } from 'react'
import eventBus from '../utilityFunctions/eventBus'

const TextField = ({ws, jobId, isWebSocketAlive, fieldKey, userId}) => {

    const [data, setData] = useState("")
    

    useEffect(()=>{
      eventBus.subscribeToEvent(fieldKey,(data) => {
        setData(data.eventData.changedValue)})
      return () => {
        eventBus.removeEventSubscription(fieldKey)
      }
    },[fieldKey])
    

    const handleChange = (e) => {
        setData(e.target.value)
        try{
          const currentTime = new Date()
          const message = { jobId: jobId, timeStamp: currentTime.toString(), userId:userId, initialValue: data, changedValue:e.target.value, field:fieldKey }
          const payload = {
            eventName:fieldKey,
            eventData:message
          }
          ws.current.send(JSON.stringify(payload) )
        }
        catch(e){
            console.log(`Web socket error in the component ${fieldKey}`, e)
        }
    }

  return (
    <input onChange={handleChange} value={data} disabled={!isWebSocketAlive}/>
  )
  
}

export default TextField