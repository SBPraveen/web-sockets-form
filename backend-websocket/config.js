let dotEnv = require("dotenv");

dotEnv.config()

module.exports = {
    httpServerconfig:{
        listenPort: 8080,
        listenHost: "0.0.0.0"
    },
    kafkaUrl:process.env.KAFKA,
    redisUrl:process.env.REDIS
}
