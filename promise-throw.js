try {
  new Promise(() => {
    throw new Error('In the constructor');
  }).catch(e => console.log('I threw up', e));
}
catch (error) {
  console.log('I was caught', error);
}
