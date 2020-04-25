const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
var serveIndex = require('serve-index');
var cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use('/secret', express.static('secret'))
app.use('/secret', serveIndex(__dirname + '/secret', {icons: true}));
app.use('/chall01', express.static('chall01'))
app.use('/chall02', express.static('chall02'))


//GET home route
app.get('/', (req, res) => {
     res.send('<html><body><h1>Welcome to the main page</h1> <br>Let me give you a flag: flag{I_Found_My_HTML_Flag}</body></html>');
});

app.get('/hitme', (req, res) => {
	res.cookie('coookiies', 'flag_this_is_my_cookie_flag_DO_NOT_STEAL_', {httpOnly:true});
	res.send('<html>Nothing here to see, move on!</html>');
});


// we will pass our 'app' to 'https' server
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
}, app)
.listen(443);

