const { Kafka } = require('kafkajs')
import config from '../../config';
import broadcast from '../app/broadcast';

let producer

const kafkaInitiate = async (serverId, sessionStoreWss) => {
    let params = { sessionStoreWss, serverId }
    const kafka = new Kafka({
        clientId: serverId,
        brokers: [config.kafkaUrl],
    })
    producer = kafka.producer()
    await producer.connect()
    const consumer = kafka.consumer({ groupId: serverId })
    await consumer.connect()
    await consumer.subscribe({ topic: config.kafkaTopic })
    await consumer.run({
        eachMessage: async ({ message }) => {
            params = { ...params, data: JSON.parse(message.value.toString()) }
            broadcast(params)
        },
    })
}

const kafkaProduce = async (message) => {
    await producer.send({
        topic: config.kafkaTopic,
        messages: [
            { value: message },
        ],
    })
}

export { kafkaInitiate, kafkaProduce }





