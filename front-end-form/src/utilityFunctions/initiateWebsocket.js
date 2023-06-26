import eventBus from "./eventBus";

const initiateWebsocket = (ws, jobId, invoiceId, setIsWebSocketAlive, setServerId) => {
    ws.current =  new WebSocket(process.env.REACT_APP_API_URL);

    ws.current.addEventListener("open", (event) => {
    //   ws.current.send("Message from front end")
      setIsWebSocketAlive(true)
    });

    ws.current.addEventListener("error", (event) => {
      console.log("WebSocket error: ", event);
      setIsWebSocketAlive(false)
    });

    ws.current.addEventListener("close", (event) => {
      console.log("The connection has been closed successfully.");
      setIsWebSocketAlive(false)
    });

    ws.current.addEventListener("message", (event) => {
        console.log("New message", event.data);
        let eventData = JSON.parse(event.data)
      if(eventData.eventName === "serverId"){
        setServerId(eventData.eventData)
      }
      else{
      eventBus.publishMessage(eventData)
      }
    });
    
  }
  export default initiateWebsocket