const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = [{
    id: 1,
    name: 'John Doe',
    status: 'active'
},
{
    id: 2,
    name: 'Jane Doe',
    status: 'active'
},
{
    id: 3,
    name: 'Michael Doe',
    status: 'retired'
}
];

var errorHandler = {
    code: -1,
    type: null,
    message: null
}


app.get('/v1/author', (req, res) => {
    var apikey = (req.headers)?req.headers['x-apikey']:'';    
    if(!apikey || apikey != 'givemeakey'){
        errorHandler.code = 401;
        errorHandler.type = 'Authentication';
        errorHandler.message = 'The provided API Key is empty or not valid!';
        res.status(401).send(errorHandler);
        return;
    }

    var filterStatus = (req.query)?(req.query.status)?req.query.status:'':'';
    
    var jsonDB = db;

    if(filterStatus){
        if(filterStatus == 'active' || filterStatus == 'retired' || filterStatus == 'temporary'){
            jsonDB = db.filter( el => { return el.status == filterStatus } );
        }else{
            errorHandler.code = 400;
            errorHandler.type = 'Input Validation';
            errorHandler.message = 'The provided status is not in the valid list of cases [active, retired, temporary].';
            res.status(400).send(errorHandler);            
            return;
        }        
    }

    res.status(200).send(jsonDB);    
});

app.post('/v1/author', (req, res) => {
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
        if(payload.status == 'active' || payload.status == 'retired' || payload.status == 'temporary'){
            var newRow = {
                id: db.length + 1,
                name: payload.name,
                status: payload.status
            }
            
            db.push(newRow);
        }else{
            errorHandler.code = 400;
            errorHandler.type = 'Input Validation';
            errorHandler.message = 'The provided status is not in the valid list of cases [active, retired, temporary].';
            res.status(400).send(errorHandler);            
            return;
        }        
        
    }

    res.status(201).send();
});

app.put('/v1/author/:authorId', (req, res) => {
    var apikey = (req.headers)?req.headers['x-apikey']:''; 
    if(!apikey || apikey != 'givemeakey'){
        errorHandler.code = 401;
        errorHandler.type = 'Authentication';
        errorHandler.message = 'The provided API Key is empty or not valid!';
        res.status(401).send(errorHandler);
        return;
    }

    var payload = req.body;
    var nameProvided = payload.name && payload.name.length > 0;
    var statusProvided = payload.status?true:false;
    var statusValid = statusProvided?(payload.status == 'active' || payload.status == 'retired' || payload.status == 'temporary'):false;
    
    if(nameProvided || statusProvided){
        if(nameProvided || (statusProvided && statusValid)){
            var found = false;
            for(i = 0; i < db.length; i++){
                if(db[i].id == req.params.authorId){
                    db[i].name = (nameProvided)?payload.name:db[i].name;
                    db[i].status= (statusProvided)?payload.status:db[i].status;
                    found = true;                    
                }

                if(found) break;
            }
            if(!found){
                errorHandler.code = 404;
                errorHandler.type = 'Update resource';
                errorHandler.message = 'The provided authorId cannot be found.';
                res.status(404).send(errorHandler);            
                return;
            }            
        }else{
            errorHandler.code = 400;
            errorHandler.type = 'Input Validation';
            errorHandler.message = 'The provided name or status are  not valid. Accepted status: [active, retired, temporary].';
            res.status(400).send(errorHandler);            
            return;
        }        
        
    }else{
        errorHandler.code = 400;
        errorHandler.type = 'Input Validation';
        errorHandler.message = 'The provided payload does not include name nor status, cannot update.';
        res.status(400).send(errorHandler);            
        return;
    }

    res.status(204).send();
});



https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
}, app)
.listen(8080);