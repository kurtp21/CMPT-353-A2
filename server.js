'use strict'
// Load the required lobraries
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Defining posts and host
const PORT = 8080;
const HOST = '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/postmessage', (req, res) => {
    var timestamp = new Date();
    
    var topic = `<h3>Topic: ${req.body.topic}</h3>`;
    var body = `<p>${req.body.data}</p>`;
    var time = `<em>[${timestamp.getDate()}/${timestamp.getMonth()}/${timestamp.getFullYear()} @ ${timestamp.getHours()}:${timestamp.getMinutes()}]</em>`;
    
    // var data = `<p style=\"font-size: 20px; font-weight: 50;\">${topic}: ${body} ${time}</p>` + '\n';
    var data = `${topic} ${body} ${time}` + '\n';
    // Write information into the file
    fs.writeFile('pages/posts.txt', data, { flag: 'a+' }, err => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to write data into file");
            return
        } 
        res.send("Data written successfully");
    });
});


app.get('/', (req, res) => {
    const filePath = path.join(__dirname, "pages", "posts.txt");
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err); 
            res.status(500).send("Failed to read posts.txt");
        } else {
            console.log("Successful reading file data");
            res.send(data);
        }
    });
});

app.use('/', express.static('pages'));
app.listen(PORT, HOST);

console.log("Up and running"); 