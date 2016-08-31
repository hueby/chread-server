const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      app = express();
const router = require('./router');

var port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
router(app);

app.listen(port);
console.log('Running on '+ port + '.' );
module.exports = app;
