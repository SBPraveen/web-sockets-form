import { useState, useEffect } from "react"
import webSocketSendData from "../utilityFunctions/websocketSendData"
import eventBus from '../utilityFunctions/eventBus'
import "../css/Dropdown.css"

const Dropdown = (props) => {

  const { ws, jobId, isWebSocketAlive, fieldKey, userId } = props.propData
  const { options } = props

  const [selected, setSelected] = useState("")

  useEffect(() => {
    eventBus.subscribeToEvent(fieldKey, (data) => {
      setSelected(data.eventData.changedValue)
    })
    return () => {
      eventBus.removeEventSubscription(fieldKey)
    }
  }, [fieldKey])

  const handleChange = (e) => {
    const wssData = { jobId, userId, initialValue: selected, changedValue: e.target.value, field: fieldKey, ws }
    webSocketSendData(wssData)
    setSelected(e.target.value)
  }

  return (
    <select className="select-div" onChange={handleChange} value={selected} disabled={!isWebSocketAlive}>
      {
        options.map((option) => (
          <option value={option} key={option}>{option}</option>
        ))
      }
    </select>
  )
}
export default Dropdown