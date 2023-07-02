import { createClient } from 'redis';

const createRedisClient = async () => {
    let redisClient
    try {
        redisClient = createClient();
        redisClient.on('error', err => console.log('Redis Client Connection Error => createRedisClient => ', err));
        await redisClient.connect();
    }
    catch (e) {
        console.log(e)
    }
    return redisClient
}

const createSubscriber = async(redisClient, pageId, sesssionStoreRedis, broadcast) => {
    const tempRedisClient = redisClient.duplicate();
    tempRedisClient.on('error', err => console.error('Redis Client Connection Error => createSubscriber => ', err));
    await tempRedisClient.connect();
    await tempRedisClient.subscribe(pageId, (message) => broadcast(message));
    sesssionStoreRedis.set(pageId, tempRedisClient)
    console.log(`Size of the sesssionStoreRedis afer adding a new client`, sesssionStoreRedis.size);
}

const redisPublisher = async(redisClient, data, serverId) => {
    const {jobId, invId} = data.eventData
    const pageId = jobId + "#" + invId
    data.serverId = serverId
    await redisClient.publish(pageId, JSON.stringify(data));
}

const redisUnsubscriber = async(ws, sesssionStoreRedis) => {
    const redisClient = sesssionStoreRedis.get(ws.pageId)
    await redisClient.unsubscribe(ws.pageId)
    await redisClient.quit()
    sesssionStoreRedis.delete(ws.pageId)  
    console.log(`Size of the sesssionStoreRedis after unsubscribing form the page id => ${ws.pageId}`, sesssionStoreRedis.size)
}


export {createRedisClient, createSubscriber, redisPublisher, redisUnsubscriber}