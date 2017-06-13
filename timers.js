Promise.resolve('promise').then(x => console.log(x));
process.nextTick(() => console.log('nextTick'));
setImmediate(() => console.log('setImmediate'), 0);
setTimeout(() => console.log('setTimeout'), 0);
console.log('sync');
