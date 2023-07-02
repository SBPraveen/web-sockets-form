import joinRoom from '../app/joinRoom';
import broadcast from '../app/broadcast';
import { redisPublisher, redisUnsubscriber } from '../app/initiateRedis';

// eventMapper maps the frontend event names to the functions written in this app. Eg: When the user emits "joinRoom" event then joinRoom function will be called
const eventMapper = {
  joinRoom: joinRoom,
  broadcast: broadcast
}



const webSocketRoute = (ws, serverId, sessionStore, redisClient) => {
  ws.on('message', function message(data) {
    //data received is in the form of a buffer so added data.toString()
    data = JSON.parse(data.toString())

    //Publish the received message to other ec2 instances using redis pubsub
    redisPublisher(redisClient, data, serverId)

    if (eventMapper[data.eventName]) {
      eventMapper[data.eventName](ws, data, sessionStore, serverId, redisClient)
    }
    else {
      eventMapper.broadcast(ws, data, sessionStore, serverId, redisClient)
    }

  });
  ws.on("close", function () {
    let clients = sessionStore.get(ws.pageId)
    if(clients && Object.keys(clients).length === 1){
      //remove from sessionStore the pageId as there was just one user and that user has also left
      sessionStore.delete(ws.pageId)
      // unsubscribe from the redis channel
      // redisUnsubscriber(ws,pageId)
      console.log("Removed the page Id from session store",sessionStore );
    }
    else{
      const tempClients = JSON.parse(JSON.stringify(clients))
      delete tempClients[ws.sessionId]
      sessionStore.set(ws.pageId, tempClients)
      console.log("Removed the just the client",sessionStore );
    }
    console.log(ws.sessionId, " ", "has closed the connection");   
  });


}
export default webSocketRoute