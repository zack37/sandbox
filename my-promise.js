
const states = {
  PENDING: 'Pending',
  RESOLVED: 'Resolved',
  REJECTED: 'Rejected'
}

class PromiseBasic {
  constructor(executor) {
    const tryCall = callback => PromiseBasic.try(() => callback(this.value))
    const laterCalls = []
    const callLater = getMember => callback => new PromiseBasic(resolve => laterCalls.push(() => resolve(getMember()(callback))))
    const members = {
      [states.RESOLVED]: {state: states.RESOLVED, then: tryCall, catch: _ => this},
      [states.REJECTED]: {state: states.REJECTED, then: _ => this, catch: tryCall},
      [states.PENDING]: {state: states.PENDING, then: callLater(() => this.then), catch: callLater(() => this.catch) },
    }
    const changeState = state => Object.assign(this, members[state])
    const apply = state => value => {
      this.value = value
      changeState(state)
      laterCalls.forEach(call => call())
    }
    const getCallback = state => value => {
      if(this.state === states.PENDING) {
        if(value instanceof PromiseBasic && state === states.RESOLVED) {
          value.then(apply(states.RESOLVED))
          value.catch(apply(states.REJECTED))
        } else {
          apply(state)(value)
        }
      }
    }
    const resolve = getCallback(states.RESOLVED)
    const reject = getCallback(states.REJECTED)

    changeState(states.PENDING)

    try {
      executor(resolve, reject)
    }
    catch(error) {
      reject(error)
    }
  }

  static resolve(value) {
    return new PromiseBasic(resolve => resolve(value))
  }

  static reject(error) {
    return new PromiseBasic((_, reject) => reject(error))
  }

  static try(callback) {
    return new PromiseBasic(resolve => resolve(callback()))
  }
}

const delay = milliseconds => new PromiseBasic(resolve => setTimeout(resolve, milliseconds));
const logThenDelay = milliseconds => total => {
    console.log(`${total / 1000.0} seconds!`);
    return delay(milliseconds)
        .then(() => total + milliseconds);
};

logThenDelay(500)(0)
  .then(logThenDelay(500))
  .then(logThenDelay(500))
  .then(logThenDelay(500))

let p = delay(500)
p.then(() => console.log('1st then'))
p.then(() => console.log('2nd then'))
p.then(() => console.log('3rd then'))

p = p.then(() => PromiseBasic.reject())
p.catch(() => console.log('1st catch'))
p.catch(() => console.log('2nd catch'))
p.catch(() => console.log('3rd catch'))