import joinRoom from '../app/joinRoom';
import broadcast from '../app/broadcast';
import { redisPublisher, redisUnsubscriber } from '../app/initiateRedis';
import { kafkaProduce } from '../app/initiateKafka';

// eventMapper maps the frontend event names to the functions written in this app. Eg: When the user emits "joinRoom" event then joinRoom function will be called
const eventMapper = {
  joinRoom: joinRoom,
  broadcast: broadcast
}

const messageTransmit = async(ws, serverId, sessionStoreWss, redisClient, sesssionStoreRedis, data, stringifiedData) => {
  //Step 1 => First produce the message to kafka so that the data will be updated to the DB
  kafkaProduce(stringifiedData)

  //Step 2 => Publish the received message to Redis pubsub so that the other ec2 instances also will get the message
  redisPublisher(redisClient, data, serverId)

  //Step 3 => The clients which are connected to the same instance same as the message producer will receive the message using the joinRoom/broadcast
  const params = { ws, data, sessionStoreWss, serverId, redisClient, sesssionStoreRedis }
  if (eventMapper[data.eventName]) {
    eventMapper[data.eventName](params)
  }
  else {
    eventMapper.broadcast(params)
  }

}

const webSocketRoute = (ws, serverId, sessionStoreWss, redisClient, sesssionStoreRedis) => {
  ws.on('message', function message(data) {
    //data received is in the form of a buffer so added data.toString()
    const stringifiedData = data.toString()
    data = JSON.parse(stringifiedData)
    messageTransmit(ws, serverId, sessionStoreWss, redisClient, sesssionStoreRedis, data, stringifiedData)
  });
  ws.on("close", function () {
    let clients = sessionStoreWss.get(ws.jobId)
    if (clients && Object.keys(clients).length === 1) {
      //remove from sessionStoreWss the jobId as there was just one user and that user has also left
      sessionStoreWss.delete(ws.jobId)
      console.log("Removed the page Id from session store wss");
      // unsubscribe from the redis channel
      redisUnsubscriber(ws, sesssionStoreRedis)

    }
    else {
      //Note dont do JSON.parse(JSON.stringify()) to the websocket connection object as it corrupts the object
      delete clients[ws.sessionId]
      sessionStoreWss.set(ws.jobId, clients)
      console.log("Removed the just the client from the session store wss", ws.sessionId);
    }
    console.log(ws.sessionId, " ", "has closed the connection");
  });


}
export default webSocketRoute