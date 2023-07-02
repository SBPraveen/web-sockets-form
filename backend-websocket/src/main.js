import config from "../config";
import Hapi from "@hapi/hapi"
import health from "./routes/health";
import { WebSocketServer } from 'ws';
import webSocketRoute from "./routes/webSocket";


const initHttp = async () => {
    const server = Hapi.server({
        port: config.httpServerconfig.listenPort,
        host: config.httpServerconfig.listenHost,
        routes: {
            cors: {
                origin: ["*"]
            }
        }
    })

    //http routes
    server.route(health)

    await server.start()


    const wss = new WebSocketServer({ server: server.listener });

    function heartbeat() {
        this.isAlive = true;
    }


    let sessionStore = new Map()

    wss.on('connection', function connection(ws) {
        ws.isAlive = true;
        ws.on('error', console.error);
        ws.send(JSON.stringify({ eventName: "serverId", eventData: server.info.id }))
        webSocketRoute(ws, server.info.id, sessionStore)
        ws.on('pong', heartbeat);

    });


    //Server side heart beat will be emitted every 5 mins
    const heartBeat = setInterval(function ping() {
        wss.clients.forEach(function each(ws) {
            if (ws.isAlive === false) {
                return ws.terminate();
            }
            ws.isAlive = false;
            ws.ping();
        });
    }, 5 * 60 * 1000);

    wss.on('close', function close() {
        clearInterval(heartBeat);
    });

    console.log(`Server running on ${server.info.uri} and server id is ${server.info.id}.`)
}

process.on('unhandledRejection', (err) => {
    console.log("Problem while starting the server: " + err)
    process.exit(1)
})

initHttp()
