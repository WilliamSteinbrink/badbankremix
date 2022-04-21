const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dal = require('./dal');

// Serve static files from public directory
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cors());



// create user account
app.get('/account/create/:name/:email/:password', (req, res) => {
  // else create user
  dal.create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

// all accounts
app.get('/account/all', (req, res) => {
  dal.all()
    .then((docs) => {
      console.log(docs);
      res.send(docs);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
})

const port = 3000
app.listen(port);
console.log('Running on port' + port);

