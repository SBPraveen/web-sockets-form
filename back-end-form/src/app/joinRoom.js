import { uuid } from 'uuidv4';

const joinRoom = (ws, data, sessionStore, serverId) => {
    const { userId, jobId, invId, timeStamp } = data.eventData
    const SESSION_ID = uuid()
    ws.sessionId = SESSION_ID
    ws.userId = userId
    const pageId = jobId + "#" + invId

    let clients = sessionStore.get(pageId)
    clients = clients ? clients : {}
    let updatedClients = { ...clients, [SESSION_ID]: ws }
    sessionStore.set(pageId, updatedClients)

}
export default joinRoom

