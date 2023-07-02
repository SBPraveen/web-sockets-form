import { uuid } from 'uuidv4';
import { createSubscriber } from "./initiateRedis"
import broadcast from './broadcast';

const joinRoom = (ws, data, sessionStore, serverId, redisClient) => {
    const { userId, jobId, invId, timeStamp } = data.eventData
    const pageId = jobId + "#" + invId

    const SESSION_ID = uuid()
    ws.sessionId = SESSION_ID
    ws.userId = userId
    ws.pageId = pageId

    let clients = sessionStore.get(pageId)

    if (!clients) {
        clients = {}
        //If the current user is the first user(in this instance) for the pageId ie. clients = undefined, then create a new redis subscriber. 
        //Note redisData is sent as a argument in the callback since the data(in the parameter of the joinRoom) consists of the joinRoom's data.
        createSubscriber(redisClient, pageId, (redisData) => {
            redisData = JSON.parse(redisData)
            if (redisData.serverId !== serverId){
                delete redisData.serverId
                broadcast(ws, redisData, sessionStore, serverId, redisClient)
            }
        })
    }

    let updatedClients = { ...clients, [SESSION_ID]: ws }
    sessionStore.set(pageId, updatedClients)

}
export default joinRoom