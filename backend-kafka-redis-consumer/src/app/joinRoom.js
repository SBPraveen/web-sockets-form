import { v4 as uuidv4 } from 'uuid'
import { createSubscriber } from "./initiateRedis"
import broadcast from './broadcast';

const joinRoom = ({ ws, data, sessionStoreWss, serverId, redisClient, sesssionStoreRedis }) => {
    const { userId, jobId, timeStamp } = data.eventData

    const SESSION_ID = uuidv4()
    ws.sessionId = SESSION_ID
    ws.userId = userId
    ws.jobId = jobId

    let clients = sessionStoreWss.get(jobId)

    if (!clients) {
        clients = {}
        //If the current user is the first user(in this instance) for the jobId ie. clients = undefined, then create a new redis subscriber. 
        const subscriberCallback = (data) => {
            data = JSON.parse(data)
            if (data.serverId !== serverId) {
                delete data.serverId
                broadcast({ data, sessionStoreWss})
            }
        }
        createSubscriber(redisClient, jobId, sesssionStoreRedis, (redisData) => subscriberCallback(redisData))
    }

    let updatedClients = { ...clients, [SESSION_ID]: ws }
    sessionStoreWss.set(jobId, updatedClients)

}
export default joinRoom