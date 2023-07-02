import joinRoom from '../app/joinRoom';
import broadcast from '../app/broadcast';

// eventMapper maps the frontend event names to the functions written in this app. Eg: When the user emits "joinRoom" event then joinRoom function will be called
const eventMapper = {
  joinRoom: joinRoom,
  broadcast: broadcast
}

const stopRedisServer = async (redis) => {
  await redis.quit()
}

const webSocketRoute = (ws, serverId, sessionStore, redis) => {
  ws.on('message', function message(data) {
    //data received is in the form of a buffer so added data.toString()
    data = JSON.parse(data.toString())

    if (eventMapper[data.eventName]) {
      eventMapper[data.eventName](ws, data, sessionStore, serverId)
    }
    else {
      eventMapper.broadcast(ws, data, sessionStore, serverId)
    }

  });
  ws.on("close", function () {
    console.log("closed");

    // stopRedisServer(redis)
  });


}
export default webSocketRoute

