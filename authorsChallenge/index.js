const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var chal01 = [{
    id: 10,
    name: 'John Doe',
    status: 'active'
},
{
    id: 22,
    name: 'Jane Doe',
    status: 'active'
},
{
    id: 23,
    name: 'Jane Doe 2',
    status: 'active'
},
{
    id: 23,
    name: 'Jane Doe 3',
    status: 'active'
},
{
    id: 25,
    name: 'Jane Doe 4',
    status: 'active'
},
{
    id: 1,
    name: 'flag(rest_is_easy_}',
    status: 'retired'
}
];

var errorHandler = {
    code: -1,
    type: null,
    message: null
}

app.get('/v1/chall01', (req, res) => {
    res.status(200).send(chal01);    
});


app.get('/v1/chall02', (req, res) => {
    var apikey = (req.headers)?req.headers['x-apikey']:'';    
    if(!apikey || apikey != 'givemeaflag'){
        errorHandler.code = 401;
        errorHandler.type = 'Authentication';
        errorHandler.message = 'The provided API Key is empty or not valid!';
        res.status(401).send(errorHandler);
        return;
    }
    res.status(200).send({flag: "flag{I_found_developers_basic_fail}"});    
});


app.post('/v1/chall03', (req, res) => {
    var apikey = (req.headers)?req.headers['x-apikey']:''; 
    if(!apikey || apikey != 'givemeakey'){
        errorHandler.code = 401;
        errorHandler.type = 'Authentication';
        errorHandler.message = 'The provided API Key is empty or not valid!';
        res.status(401).send(errorHandler);
        return;
    }
    
    var payload = req.body;
    if(payload.name && payload.name.length > 0 && payload.status){
        if(payload.status == 'Sleepy' && payload.name == "Antonio Vaz" && payload.status == "Sleepy"){
            //  validation OK, leave with a success code
        }else{
            errorHandler.code = 400;
            errorHandler.type = 'Input Validation';
            errorHandler.message = 'The provided data is not correct.';
            res.status(400).send(errorHandler);            
            return;
        }        
        
    }else{
        errorHandler.code = 400;
        errorHandler.type = 'Input Validation';
        errorHandler.message = 'The provided data is not correct.';
        res.status(400).send(errorHandler);            
        return;
    }

    res.status(201).send({ flag: "flag{who_cares_if_you_are_sleepy}" });
});

app.get('/v1/chall04/:resourceId', (req, res) => {
    var apikey = (req.headers)?req.headers['x-apikey']:''; 
    if(!apikey || apikey != 'givemeakey'){
        errorHandler.code = 401;
        errorHandler.type = 'Authentication';
        errorHandler.message = 'The provided API Key is empty or not valid!';
        res.status(401).send(errorHandler);
        return;
    }

    if(!req.params.resourceId){
        errorHandler.code = 400;
        errorHandler.type = 'Validation';
        errorHandler.message = 'Humm, I need a resource ID ... come one!!';
        res.status(400).send(errorHandler);
        return;
    }

    if(req.params.resourceId > 100000){
        errorHandler.code = 404;
        errorHandler.type = 'FLAG';
        errorHandler.message = 'flag{look_at_me_I_can_cause_a_404_}';
        res.status(404).send(errorHandler);
        return;
    }else
        res.status(200).send({ resourceId: req.params.resourceId});    
});

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
}, app)
.listen(8081);