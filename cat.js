const fs = require('fs');
const { createInterface } = require('readline');
const { Observable } = require('rxjs/Rx');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

// Rl.prompt();

function questionAsync(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

const commandMap = Object.create(null);
commandMap.commands = () => {
  const allCommands = Object.keys(commandMap).sort();
  console.log('Available Commands:', allCommands.join(', '));
  return Observable.of(null);
};
commandMap.quit = () => {
  rl.close();
  return Observable.empty();
};
commandMap.cat = () => {
  return Observable.fromPromise(
    questionAsync('Enter a phrase you want repeated: ').then(console.log),
  );
};

Observable.fromEvent(rl, 'line')
  .takeUntil(Observable.fromEvent(rl, 'close'))
  .map(line => commandMap[line])
  .map(command => {
    if (!command) {
      console.log('Command not found');
      return () => Observable.of(null);
    }
    return command;
  })
  .flatMap(command => command())
  .subscribe(
    () => {
      rl.prompt();
    },
    err => console.error(err),
    () => {
      console.log('Goodbye!');
      process.exit(0);
    },
  );
