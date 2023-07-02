const broadcast = ({ data, sessionStoreWss }) => {
    if (data && data.eventData) {
        const { jobId, invId } = data.eventData
        const pageId = jobId + "#" + invId
        if (!sessionStoreWss.has(pageId)) {
            console.log("Redis does not have pageId => ", pageId);
            return ""
        }
        let clients = sessionStoreWss.get(pageId)
        const sessionIds = Object.keys(clients)
        console.log("Broadcating to ", sessionIds.length, " clients", sessionIds)
        sessionIds.forEach((sessionId) => {
            console.log("sessionId", sessionId);
            const wsUser = clients[sessionId]
            wsUser && wsUser.send(JSON.stringify(data))
        })
    }


}

export default broadcast