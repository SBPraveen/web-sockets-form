import {Kafka} from "kafkajs"
import config from "../../config"

let producer

const initiateKafka = async(serverId) => {
    const kafka = new Kafka({
        clientId: serverId,
        brokers: [config.kafkaUrl],
    }) 
    producer = kafka.producer()
    await producer.connect()
}

const kafkaProduce = async (message) => {
    console.log("message =>>>", message);
    const {jobId} = message && message.eventData ? message.eventData : {jobId:"ASDF"}
    await producer.send({
        topic: "job_events",
        messages: [
            { value: JSON.stringify(message), key: jobId },
        ],
    })
}

export {initiateKafka, kafkaProduce}