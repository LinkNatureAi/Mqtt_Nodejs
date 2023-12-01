const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  setInterval(() => {
    try {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      client.publish('train', JSON.stringify({ value: randomNumber }));
    } catch (error) {
      console.error('Error publishing message:', error);
    }
  }, 300);
});

client.on('error', (error) => {
  console.error('Error connecting to MQTT broker:', error);
});
