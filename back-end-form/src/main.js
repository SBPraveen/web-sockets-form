import config from "../config";
import Hapi from "@hapi/hapi"
import health from "./routes/health";
import SocketIO from "socket.io"
import webSocket from "./routes/webSocket";

const initHttp = async () => {
    const server = Hapi.server({
        port : config.httpServerconfig.listenPort,
        host: config.httpServerconfig.listenHost,
        routes:{
            cors:{
                origin:["*"]
            }
        }
    })

    //routes
    server.route(health)

    await server.start()
    console.log(`Server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log("Problem while starting the server: " + err)
    process.exit(1)
})

initHttp()

const initWebsockets = async () => {
    const server = Hapi.server({
        port : config.websocketServerconfig.listenPort ,
        host: config.websocketServerconfig.listenHost,
        routes:{
            cors:{
                origin:["*"]
            }
        }
    })

    const io = SocketIO(server.listener, {
        cors: {
            origin: ["*"],
          methods: ["GET", "POST"]
        }
      })

      webSocket(io)

    await server.start()
    console.log(`Websocket server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log("Problem while starting the server: " + err)
    process.exit(1)
})

initWebsockets()
