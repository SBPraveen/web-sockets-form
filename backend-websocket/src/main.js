import config from "../config";
import Hapi from "@hapi/hapi"
import health from "./routes/health";
import { WebSocketServer } from 'ws';
import webSocketRoute from "./routes/webSocket";
import {createRedisClient} from "./app/initiateRedis";

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

    //Note dont do JSON.parse(JSON.stringify()) to the websocket connection object/ redis connection objects stored in sessionStoreWss/sesssionStoreRedis as it corrupts the object
    let sessionStoreWss = new Map()
    let sesssionStoreRedis = new Map()
    const redisClient = await createRedisClient()

    wss.on('connection', function connection(ws) {
        ws.isAlive = true;
        ws.on('error', console.error);
        ws.send(JSON.stringify({ eventName: "serverId", eventData: server.info.id }))
        webSocketRoute(ws, server.info.id, sessionStoreWss, redisClient, sesssionStoreRedis)
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

    const stopRedis = async (redisClient) => {
        await redisClient.unsubscribe();
        await redisClient.quit()
      }

    wss.on('close', function close() {
        clearInterval(heartBeat);
        stopRedis(redisClient)
    });

    console.log(`Server running on ${server.info.uri} and server id is ${server.info.id}.`)
}

process.on('unhandledRejection', (err) => {
    console.log("Problem while starting the server: " + err)
    process.exit(1)
})

initHttp()