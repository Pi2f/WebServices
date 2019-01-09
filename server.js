const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const got = require('got');
const laboratory = require('./laboratory.js');
const university = require('./university.js');
const author = require('./author.js');

// Pour le dump de données du portail HAL
// const dataLayer = require('./dataLayer.js');
// const mongoose = require('mongoose');

//create connection
// mongoose.connect('mongodb://192.168.99.100:32775/moteurRecherche',{
//     useNewUrlParser: true
// }, function(err){
//     if(err){
//         throw err;
//     } else {
//         console.log('mongo connected : Basic Search');
//     }
// });

const app = express();

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({'extended':'true'}));  
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static(path.resolve('node_modules')));


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
  got('http://192.168.99.100:32775/solr/mongo/clustering?q=titles:*'+req.params.keyword+"*&wt=json", {  
      json: true })
  .then(response => {
    // dataLayer.search(response.body.response.docs,req.params.keyword);
    res.send(response.body);
  })
  .catch(handleError);
});

app.post('/filter', function(req, res) {
    var str = "";
    req.body.forEach(element => {
        str += element+" ";
    });
    got('http://192.168.99.100:32775/solr/mongo/clustering?q=id:('+str+")&wt=json", {  
        json: true })
    .then(response => {
        res.send(response.body);
    })
    .catch(handleError);
  });

function handleError(error){
  console.log('error:', error);
}

const server = http.createServer(app).listen(3001, function(){ 
  console.log(`Example app listening on port 3001!`)
});
