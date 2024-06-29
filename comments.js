//Create web server
var express = require('express');
var app = express();
var fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Load comments from JSON file
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

//Post comments to JSON file
app.post('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        res.send('Error');
      } else {
        res.send('Success');
      }
    });
  });
});

//Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});