import joinRoom from '../app/joinRoom';
import broadcast from '../app/broadcast';
import { kafkaProduce } from '../app/kafka';

// eventMapper maps the frontend event names to the functions written in this app. Eg: When the user emits "joinRoom" event then joinRoom function will be called
const eventMapper = {
  joinRoom: joinRoom,
  broadcast: broadcast
}



const webSocketRoute = (ws, serverId, sessionStoreWss) => {
  ws.on('message', function message(data) {
    //data received is in the form of a buffer so added data.toString()
    data = data.toString()
    kafkaProduce(data)
    data = JSON.parse(data.toString())
    const params = {ws, data, sessionStoreWss, serverId}

    if (eventMapper[data.eventName]) {
      eventMapper[data.eventName](params)
    }
    else {
      eventMapper.broadcast(params)
    }

  });
  ws.on("close", function () {
    let clients = sessionStoreWss.get(ws.jobId)
    if(clients && Object.keys(clients).length === 1){
      //remove from sessionStoreWss the jobId as there was just one user and that user has also left
      sessionStoreWss.delete(ws.jobId)
      console.log("Removed the page Id from session store wss" );
      
      
    }
    else{
      //Note dont do JSON.parse(JSON.stringify()) to the websocket connection object as it corrupts the object
      delete clients[ws.sessionId]
      sessionStoreWss.set(ws.jobId, clients)
      console.log("Removed the just the client from the session store wss", ws.sessionId );
    }
    console.log(ws.sessionId, " ", "has closed the connection");   
  });


}
export default webSocketRoute