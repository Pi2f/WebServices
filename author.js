const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const got = require('got');
const dataCoautLayer = require('./dataCoautLayer')

const app = express();

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/author/:keyword', function(req, res) {
    got("http://api.archives-ouvertes.fr/search/?q="+req.params.keyword+"&wt=json&fl=authFullName_s", {  
        json: true })
    .then(response => {
        res.send(response.body);
        dataCoautLayer.search(response.body.response.docs,req.params.keyword);
    })
    .catch(handleError);
});

function handleError(error){
    console.log('error:', error);
}

const server = http.createServer(app).listen(3004, function(){ 
    console.log(`Example app listening on port 3004!`)
});