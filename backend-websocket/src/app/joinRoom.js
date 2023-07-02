import { uuid } from 'uuidv4';
import { createSubscriber } from "./initiateRedis"
import broadcast from './broadcast';

const joinRoom = ({ ws, data, sessionStoreWss, serverId, redisClient, sesssionStoreRedis }) => {
    const { userId, jobId, invId, timeStamp } = data.eventData
    const pageId = jobId + "#" + invId

    const SESSION_ID = uuid()
    ws.sessionId = SESSION_ID
    ws.userId = userId
    ws.pageId = pageId

    let clients = sessionStoreWss.get(pageId)

    if (!clients) {
        clients = {}
        //If the current user is the first user(in this instance) for the pageId ie. clients = undefined, then create a new redis subscriber. 
        const subscriberCallback = (data) => {
            data = JSON.parse(data)
            if (data.serverId !== serverId) {
                delete data.serverId
                broadcast({ data, sessionStoreWss})
            }
        }
        createSubscriber(redisClient, pageId, sesssionStoreRedis, (redisData) => subscriberCallback(redisData))
    }

    let updatedClients = { ...clients, [SESSION_ID]: ws }
    sessionStoreWss.set(pageId, updatedClients)

}
export default joinRoom