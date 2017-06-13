const { EventEmitter } = require('events');

const emitter = new EventEmitter();

emitter.on('next', () => {
  process.nextTick(() => {
    emitter.emit('next');
  });
});

emitter.emit('next');
