const broadcast = ({ data, sessionStoreWss }) => {
    if (data && data.eventData) {
        const { jobId } = data.eventData
        if (!sessionStoreWss.has(jobId)) {
            console.log("Redis does not have jobId => ", jobId);
            return ""
        }
        let clients = sessionStoreWss.get(jobId)
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