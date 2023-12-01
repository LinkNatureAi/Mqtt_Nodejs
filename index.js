const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to the 'train2' topic
  client.subscribe('train2', (err) => {
    if (err) {
      console.error('Error subscribing to train2:', err);
    } else {
      console.log('Subscribed to train2');
    }
  });

  // Publish random numbers to the 'train' topic at regular intervals
  const publishInterval = setInterval(() => {
    try {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      client.publish('train', JSON.stringify({ value: randomNumber }));
    } catch (error) {
      console.error('Error publishing message:', error);
    }
  }, 1000);

  // // Stop publishing after 10 seconds
  // setTimeout(() => {
  //   clearInterval(publishInterval);
  //   console.log('Stopped publishing messages to train topic');
  // }, 10000);
});

// Listen for incoming messages on the subscribed topic
client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  // Additional handling for received messages can be added here
});

client.on('error', (error) => {
  console.error('Error:', error);
  // You can add specific error handling logic based on the error types here
});

client.on('offline', () => {
  console.log('Client is offline');
  // Additional logic when the client goes offline
});

client.on('reconnect', () => {
  console.log('Client is trying to reconnect');
  // Additional logic when the client is attempting to reconnect
});

client.on('close', () => {
  console.log('Connection to MQTT broker is closed');
  // Additional logic when the connection is closed
});

// Gracefully close the connection when the process is terminated
process.on('SIGINT', () => {
  client.end();
  console.log('MQTT client disconnected');
  process.exit();
});
