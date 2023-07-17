import { v4 as uuidv4 } from 'uuid'
import broadcast from './broadcast';

const joinRoom = ({ ws, data, sessionStoreWss, serverId }) => {
    const { userId, jobId, timeStamp } = data.eventData

    const SESSION_ID = uuidv4()
    ws.sessionId = SESSION_ID
    ws.userId = userId
    ws.jobId = jobId

    let clients = sessionStoreWss.get(jobId)

    let updatedClients = { ...clients, [SESSION_ID]: ws }
    sessionStoreWss.set(jobId, updatedClients)

}
export default joinRoom
