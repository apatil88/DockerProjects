//Simple NodeJS app to demonstrate use of Docker Compose
//NodeJS app resides in a separate container
//Redis resides in a separate container

//NodeJS app uses redis client to get count stored in redis cache and display on the front end

const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});
client.set('visits', 0);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
