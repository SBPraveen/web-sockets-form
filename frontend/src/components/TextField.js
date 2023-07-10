import React, { useEffect, useState } from 'react'
import eventBus from '../utilityFunctions/eventBus'
import "../css/TextField.css"
import webSocketSendData from '../utilityFunctions/websocketSendData'

const TextField = (props) => {

  const { ws, jobId, isWebSocketAlive, fieldKey, userId } = props.propData

  const [data, setData] = useState("")


  useEffect(() => {
    eventBus.subscribeToEvent(fieldKey, (data) => {
      setData(data.eventData.changedValue)
    })
    return () => {
      eventBus.removeEventSubscription(fieldKey)
    }
  }, [fieldKey])


  const handleChange = (e) => {
    setData(e.target.value)
  }

  const handleOnBlur = (e) => {
    const wssData = { jobId: jobId, userId: userId, initialValue: data, changedValue: e.target.value, field: fieldKey, ws }
    webSocketSendData(wssData)
  }

  return (
    <input className='input' onBlur={handleOnBlur} onChange={handleChange} value={data} disabled={!isWebSocketAlive} />
  )

}

export default TextField