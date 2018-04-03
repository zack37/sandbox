const express = require('express');
const multer = require('multer');
const mimeTypes = require('mime-types');

const app = express();
const upload = multer();
const loggerMiddleware = ({ prefix }) => (req, res, next) => {
  console.log(prefix, new Date().toISOString(), req.method, req.path);
  next();
};

app.use(loggerMiddleware({ prefix: 'APP' }));

app.get('/', (req, res) => {
  res.send(`
    <form method="post" enctype="multipart/form-data">
      <p>Name: <input type="text" name="name" /></p>
      <p>Image: <input type="file" name="image" multiple /></p>
      <p><input type="submit" value="Upload" /></p>
    </form>
  `);
});

app.post('/', upload.array('image'), (req, res) => {
  console.log('files', req.files);
  req.files.forEach(file => console.log(mimeTypes.extension(file.mimetype)));
  console.log('body', req.body);
  res.redirect('/');
});

app.listen(5001);
console.log('Express server started on port 3000');
