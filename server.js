'use strict';

const timers = require('timers');
const createWarren = require('warren');

const brokerConfig = {
  vhosts: { '/': { exchanges: ['e'], queues: ['q'], bindings: [ 'e -> q' ] } },
  publications: { p: { exchange: 'e' } },
  subscriptions: { s: { queue: 'q' } },
}

const hosts = [5672, 5673].map(port => ({ hostname: '192.168.99.100', port }));

const options = {
  hosts,
  brokerConfig,
  timeout: 1000,
  minBrokersAvailable: 1
};

const warren = createWarren(options, (err, warren) => {
  if(err) return console.log(err);

  warren.subscribe('s', (message, content, ackOrNack) => {
    console.log(`received message: ${content}`);
    ackOrNack()
  });

  function publish(count) {
    warren.publish('p', count, {}, err => {
      console.log(`publish confirmed: ${count} ${err ? err.message : ''}`);
      timers.setTimeout(publish, 500, count + 1);
    });
  }
  publish(1);
});

warren.on('error', err => console.log(`${err.message}`));
