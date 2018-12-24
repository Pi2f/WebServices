const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const laboratory = require('./laboratory.js');
const university = require('./university.js');
const author = require('./author.js');
const dataLayer = require('./dataLayer.js');
const got = require('got');
const mongoose = require('mongoose');

const app = express();

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({'extended':'true'}));  
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static(path.resolve('node_modules')));

//create connection
mongoose.connect('mongodb://192.168.99.100:32775/moteurRecherche',{
    useNewUrlParser: true
}, function(err){
    if(err){
        throw err;
    } else {
        console.log('mongo connected : Basic Search');
    }
});

app.get('/', (req, res) => res.sendFile(__dirname+'/app/index.html')); 

app.get('/university/:keyword', function(req, res) {
  got('/university/'+req.params.keyword, { 
      baseUrl: "http://localhost:3002", 
      json: true })
  .then(response => res.send(response.body))
  .catch(handleError);
});

app.get('/laboratory/:keyword', function(req, res) {
  got('/laboratory/'+req.params.keyword, { 
      baseUrl: "http://localhost:3003", 
      json: true })
  .then(response => res.send(response.body))
  .catch(handleError);
});

app.get('/author/:keyword', function(req, res) {
  got('/author/'+req.params.keyword, { 
      baseUrl: "http://localhost:3004", 
      json: true })
  .then(response => res.send(response.body))
  .catch(handleError);
});

app.get('/:keyword', function(req, res) {
  got('http://api.archives-ouvertes.fr/search/?q='+req.params.keyword+"&wt=json&fl=title_s,authFullName_s,keyword_s,labStructName_s,structName_s", {  
      json: true })
  .then(response => {
    dataLayer.search(response.body.response.docs,req.params.keyword);
    res.send(response.body)
  })
  .catch(handleError);
});

function handleError(error){
  console.log('error:', error);
}

const server = http.createServer(app).listen(3001, function(){ 
  console.log(`Example app listening on port 3001!`)
});
