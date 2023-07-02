import { createClient } from 'redis';

const initiateRedis = async () => {
    let redis
    try {
        redis = createClient();
        redis.on('error', err => console.log('Redis Client Error', err));
        await redis.connect();
    }
    catch (e) {
        console.log(e)
    }
    return redis
}

export default initiateRedis