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

    //web socket
    const io = SocketIO(server.listener, {
        cors: {
            origin: ["*"],
          methods: ["GET", "POST"]
        }
      })

      webSocket(io, server.info.id)

    //http routes
    server.route(health)

    await server.start()
    console.log(`Server running on ${server.info.uri} and server id is ${server.info.id}`)
}

process.on('unhandledRejection', (err) => {
    console.log("Problem while starting the server: " + err)
    process.exit(1)
})

initHttp()
