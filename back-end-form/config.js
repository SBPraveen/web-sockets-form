let dotEnv = require("dotenv");

dotEnv.config()

module.exports = {
    httpServerconfig:{
        listenPort: 8080,
        listenHost: "0.0.0.0"
    },
    cors: process.env.RUNNING_ENV === "cloud" ? process.env.API_URL : "*",
    apiUrl: process.env.API_URL
}
