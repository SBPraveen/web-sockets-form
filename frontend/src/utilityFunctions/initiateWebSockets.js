import eventBus from "./eventBus";

const maxHeartBeatRequests = 10
let noOfHeartBeatRequests = 0
let webSocketHeartBeat

const initiateWebSockets = (ws, jobId, setIsWebSocketAlive, setServerId, USER_ID) => {

  ws.current = new WebSocket(process.env.REACT_APP_API_URL);

  ws.current.addEventListener("open", (event) => {
    setIsWebSocketAlive(true)
    clearInterval(webSocketHeartBeat)
    noOfHeartBeatRequests = 0
    //Note If webSocketHeartBeat is not set to false then  on ws.current.addEventListener => "close" multipe setInterval's will be created. So the if condition in ws.current.addEventListener => "close" and webSocketHeartBeat = false these line are important
    webSocketHeartBeat = false

    //join room
    const message = { jobId: jobId,timeStamp: Date.now(), userId:USER_ID}
          const payload = {
            eventName:"joinRoom",
            eventData:message
          }
          ws.current.send(JSON.stringify(payload) )
  });

  ws.current.addEventListener("error", (event) => {
    console.log("WebSocket error: ", event);
    ws.current && ws.current.close()
    ws.current = null
    setIsWebSocketAlive(false)

  });

  ws.current.addEventListener("close", (event) => {
    console.log("The connection has been closed successfully.");
    setIsWebSocketAlive(false)
    console.log("ws => ", ws, "ws.readyState");
    if(noOfHeartBeatRequests === 0) {
      //The first request(heart beat) has to go immediately then for every 3 seconds the heart beat will be sent until the  noOfHeartBeatRequests < maxHeartBeatRequests
      noOfHeartBeatRequests = noOfHeartBeatRequests + 1
      initiateWebSockets(ws, jobId, setIsWebSocketAlive, setServerId, USER_ID)
    }
    if(!webSocketHeartBeat){
      webSocketHeartBeat = setInterval(() => {
        if(noOfHeartBeatRequests < maxHeartBeatRequests){
          console.log("Initiating web socket connection");
          ws.current && ws.current.close()
          ws.current = null
          noOfHeartBeatRequests = noOfHeartBeatRequests + 1
          initiateWebSockets(ws, jobId, setIsWebSocketAlive, setServerId, USER_ID)
          
        } 
      }, 3000);
    }
    

  });

  ws.current.addEventListener("message", (event) => {
    let eventData = JSON.parse(event.data)
    if (eventData.eventName === "serverId") {
      setServerId(eventData.eventData)
    }
    else {
      eventBus.publishMessage(eventData)
    }
  });
  return ws

}
export default initiateWebSockets


/**
 *   Note
 * * WebSocket.send()
  The WebSocket.send() method accepts data in the following format:
  string
  ArrayBuffer
  Blob
  TypedArray or a DataView
  
 */