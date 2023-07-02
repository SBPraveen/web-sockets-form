let dotEnv = require("dotenv");

dotEnv.config()

module.exports = {
    httpServerconfig:{
        listenPort: 1111,
        listenHost: "0.0.0.0"
    },
    kafkaUrl:process.env.KAFKA,
    redisUrl:process.env.REDIS
}
