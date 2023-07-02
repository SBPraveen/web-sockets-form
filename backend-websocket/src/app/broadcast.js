const broadcast = (ws, data, sessionStore, serverId, redisClient) => {
    const {jobId, invId} = data.eventData
    const pageId = jobId + "#" + invId
    if(!sessionStore.has(pageId)){
        console.log("Redis does not have pageId => ", pageId);
        return ""
    }
    let clients = sessionStore.get(pageId)
    const sessionIds = Object.keys(clients)
    console.log("Broadcating to ", sessionIds.length, " clients");
    sessionIds.forEach((sessionId) => {
        const wsUser = clients[sessionId]
        wsUser && wsUser.send(JSON.stringify(data))
    })
    
}

export default broadcast