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

const createSubscriber = async(redisClient, jobId, sesssionStoreRedis, broadcast) => {
    const tempRedisClient = redisClient.duplicate();
    tempRedisClient.on('error', err => console.error('Redis Client Connection Error => createSubscriber => ', err));
    await tempRedisClient.connect();
    await tempRedisClient.subscribe(jobId, (message) => broadcast(message));
    sesssionStoreRedis.set(jobId, tempRedisClient)
    console.log(`Size of the sesssionStoreRedis afer adding a new client`, sesssionStoreRedis.size);
}

const redisPublisher = async(redisClient, data, serverId) => {
    const {jobId} = data.eventData
    data.serverId = serverId
    // await redisClient.publish(jobId, JSON.stringify(data));
}

const redisUnsubscriber = async(ws, sesssionStoreRedis) => {
    const redisClient = sesssionStoreRedis.get(ws.jobId)
    await redisClient.unsubscribe(ws.jobId)
    await redisClient.quit()
    sesssionStoreRedis.delete(ws.jobId)  
    console.log(`Size of the sesssionStoreRedis after unsubscribing form the page id => ${ws.jobId}`, sesssionStoreRedis.size)
}


export {createRedisClient, createSubscriber, redisPublisher, redisUnsubscriber}