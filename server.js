// This is where our server code will be
var express = require('express'), //require express

    _ = require('lodash'), //utility library that makes working with objects and arrays easier
    bodyParser = require('body-parser'), // body parser makes it possible to post json to the server
    morgan = require('morgan'),
    app = express(); //create an express app

app.use(express.static('client'));

app.use(morgan('combine'));//HTTP request logger middleware for node.js

//boyd-parser extracts the entire body portion of an incoming request stream
//and exposes it on req.body as something easier to interface with
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//HTTP verb POST, GET, PUT, DELETE CRUD (create, read, update, destroy)

var users = [
    {
        name: 'Sally Rally',
        intro: 'hello my name is sally',
        age: 24,
        gender: 'female'
    }
];

var id = 0;

var updateId = function(req, res, next) {
    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }
    next();
};


app.get('/users', function(req, res, next){
    // var user = _.find(users, {id: req.params.id});
    res.json(users || {});
});

app.get('/users/:id', function(req, res, next){
   var user = _.find(users, {id: req.params.id});
    res.json(user || {});
});

app.post('/users', updateId, function(req, res){
    var user = req.body;
    console.log(req.body);
    users.push(user);

    res.json(users);
    console.log(req.body)
});

app.put('/users/:id', function(req, res) {
    var update = req.body;
    if (update.id) {
        delete update.id
    }
    var user = _.findIndex(users, {id: req.params.id});
    if (!users[user]) {
        res.send();
    } else {
        var updateduser = _.assign(users[user], update);
        res.json(updateduser);
    }
});

app.listen(9000);