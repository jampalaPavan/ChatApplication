const kafka = require('kafka-node');

// Initialize Kafka client and producer
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const kafkaProducer = new kafka.Producer(kafkaClient);
const kafkaConsumer = new kafka.Consumer(kafkaClient, [{ topic: 'messages' }], { groupId: 'message-group' });

// Handle producer ready event
kafkaProducer.on('ready', () => {
    console.log('Kafka Producer is ready');
});

// Handle producer error event
kafkaProducer.on('error', (error) => {
    console.error('Error initializing Kafka producer:', error);
});

// Handle consumer message event
kafkaConsumer.on('message', (message) => {
    try {
        const messageData = JSON.parse(message.value);
        console.log('Received message:', messageData);

        // Process received message
        processMessage(messageData);
    } catch (error) {
        console.error('Error processing message:', error);
    }
});

// Function to process received message
function processMessage(messageData) {
    console.log(`Processing message for user ${messageData.receiverId}: ${messageData.messageContent}`);
}

// Handle consumer error event
kafkaConsumer.on('error', (error) => {
    console.error('Error in Kafka consumer:', error);
});

// Export the Kafka producer
module.exports = { kafkaProducer };
