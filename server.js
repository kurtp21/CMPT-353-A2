'use strict'
// Load the required lobraries
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const app = express();

// Defining posts and host
const PORT = 8080;
const HOST = '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true }));


app.post('/postmessage', (req, res) => {
    var timestamp = new Date(); 
    var topic = req.body.topic;
    var data = req.body.data + "  --  Timestamp: " + timestamp.getTime() + "\n"; 

    // Write information into the file
    fs.writeFile('pages/' + topic, data, { flag: 'a+' }, err => {
        if (err) {
            console.error(err);
            throw err;
        }
        res.send("Data written");
        console.log("Data written to file");
    });
});

app.use('/', express.static('pages'));
app.listen(PORT, HOST);

console.log("Up and running"); 