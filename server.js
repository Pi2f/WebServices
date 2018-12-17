const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({'extended':'true'}));  
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static(path.resolve('node_modules')));

app.get('/', (req, res) => res.sendFile(__dirname+'/app/index.html')); 

const server = http.createServer(app).listen(3001, function(){ 
  console.log(`Example app listening on port 3001!`)
});
