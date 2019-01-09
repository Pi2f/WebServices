const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const got = require('got');
// const dataUniversityLayer = require('./dataUniversityLayer');

const app = express();

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/university/:keyword', function(req, res) {
    got("http://192.168.99.100:32775/solr/mongo/clustering?q=universities:*"+req.params.keyword+"*&wt=json", {  
    // got("http://api.archives-ouvertes.fr/search/?q=(structName_s:"+req.params.keyword+")OR(structAcronym_s:"+req.params.keyword+")&wt=json&fl=title_s,uri_s", {  
        json: true })
    .then(response => {
        res.send(response.body);
        // dataUniversityLayer.search(response.body.response.docs,req.params.keyword);
    })
    .catch(handleError);
});

function handleError(error){
    console.log('error:', error);
}

const server = http.createServer(app).listen(3002, function(){ 
    console.log(`Example app listening on port 3002!`)
});