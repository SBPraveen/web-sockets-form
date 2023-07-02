import { createClient } from 'redis';

const createRedisClient = async () => {
    let redisClient
    try {
        redisClient = createClient();
        redisClient.on('error', err => console.log('Redis Client Error', err));
        await redisClient.connect();
    }
    catch (e) {
        console.log(e)
    }
    return redisClient
}

const createSubscriber = async(redisClient, pageId, broadcast) => {
    const tempRedisClient = redisClient.duplicate();
    tempRedisClient.on('error', err => console.error(err));
    await tempRedisClient.connect();
    await tempRedisClient.subscribe(pageId, (message) => broadcast(message));
}

const redisPublisher = async(redisClient, data, serverId) => {
    const {jobId, invId} = data.eventData
    const pageId = jobId + "#" + invId
    data.serverId = serverId
    await redisClient.publish(pageId, JSON.stringify(data));
}

const redisUnsubscriber = async(redisClient, pageId) => {
    await redisClient.unsubscribe(pageId);
}


export {createRedisClient, createSubscriber, redisPublisher, redisUnsubscriber}