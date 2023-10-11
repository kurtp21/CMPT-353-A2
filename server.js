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

    var topic = "<h3>Topic: " + req.body.topic + "</h3>";
    var body = "<p style=\"font-size: 10px font-weight: 100\">" + req.body.data + "</p>";
    var time = "<em>Timestamp: " + timestamp.getTime() + "</em>";

    var data = topic + "\n" + body + "\n" + time; 

    // Write information into the file
    fs.writeFile('pages/posts.txt', data, { flag: 'a+' }, err => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to write data into file");
        } else {
            console.log("Successful writing to file");
            res.send(JSON.stringify(data));
        }
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
            res.send(JSON.stringify(data));
        }
    });
});

// app.post('/sayHello', (req,res) => {
//     var name = req.body.name;
//     var response = new Object();
//     response.answer = "hello " + name;         
//     res.send(JSON.stringify(response));
// });

app.use('/', express.static('pages'));
app.listen(PORT, HOST);

console.log("Up and running"); 