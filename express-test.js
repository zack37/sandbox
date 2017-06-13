const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  throw new Error('Boom');
});

app.listen(3030, () => {
  console.log('Example app listening on port 3030');
});
