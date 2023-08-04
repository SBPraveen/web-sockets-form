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
    await producer.send({
        topic: "job_events",
        messages: [
            { value: message },
        ],
    })
}

export {initiateKafka, kafkaProduce}