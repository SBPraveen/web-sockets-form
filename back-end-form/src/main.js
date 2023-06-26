import config from "../config";
import Hapi from "@hapi/hapi"
import health from "./routes/health";
import { WebSocketServer } from 'ws';
import webSocketRoute from "./routes/webSocket";

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

    //http routes
    server.route(health)

    await server.start()
    

    const wss = new WebSocketServer({server: server.listener});


wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.send(JSON.stringify({eventName:"serverId", eventData:server.info.id}))
  
    ws.on('message', function message(data) {
        data = JSON.parse(data.toString())
      console.log('received:', data);
      console.log(data.eventName, data.eventName === "invoiceValue");
      if(data.eventName === "invoiceValue"){
        const temp = {eventName:"freightValue", eventData:"21"}
        console.log("temp", temp);
        ws.send(JSON.stringify(temp))
      }
    });
  
    
  });

  console.log(`Server running on ${server.info.uri} and server id is ${server.info.id}.`)
}

process.on('unhandledRejection', (err) => {
    console.log("Problem while starting the server: " + err)
    process.exit(1)
})

initHttp()

