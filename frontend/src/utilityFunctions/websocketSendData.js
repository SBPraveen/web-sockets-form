const webSocketSendData = ({ jobId, userId, initialValue, changedValue, field, ws }) => {
  try {
    const currentTime = new Date()
    const message = { jobId, timeStamp: currentTime.toString(), userId, initialValue, changedValue, field }
    const payload = {
      eventName: field,
      eventData: message
    }
    ws.current.send(JSON.stringify(payload))
  }
  catch (e) {
    console.log(`Web socket error in the component ${field}`, e)
  }
}
export default webSocketSendData

