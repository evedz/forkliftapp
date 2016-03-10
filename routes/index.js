var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');

var conString = "postgres://forkliftUSER:forklift@localhost:5432/forkliftDB";
var client = new pg.Client(conString);

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'../../index.html'));
});

router.get('/api/cars', function(req, res) {
    client.connect(function(err) {
        if(err) {return console.error('could not connect to postgres', err);}
        client.query('SELECT * FROM cars ORDER BY id ASC', function(err, result) {
            if(err) {return console.error('error running query', err);}
            res.json(result);
        });
    });
});

router.post('/api/cars', function(req, res) {
    client.connect(function(err) {
        if(err) {return console.error('could not connect to postgres', err);}
        client.query("INSERT INTO cars(name, capacity) VALUES ($1, $2)", [req.body.name,req.body.capacity],function(err, result) {
            if(err) {return console.error('error running query', err);}
            res.status(201).json([req.body.name,req.body.capacity]);
        });
    });
});

router.delete('/api/cars/:id', function (req, res) {
    client.connect(function(err) {
        if(err) {return console.error('could not connect to postgres', err);}
        client.query("DELETE FROM cars WHERE id = $1", [req.params.id],function(err, result) {
            if(err) {return console.error('error running query', err);}
            res.status(204).json([result]);
        });
    });
});

router.put('/api/cars/:id', function (req, res) {
    client.connect(function(err) {
        if(err) {return console.error('could not connect to postgres', err);}
        client.query("UPDATE cars SET name = $1, capacity = $2 WHERE id = $3;", [req.body.name,req.body.capacity,req.params.id],function(err, result) {
            if(err) {return console.error('error running query', err);}
            res.json(result);
        });
    });
});

module.exports = router;
