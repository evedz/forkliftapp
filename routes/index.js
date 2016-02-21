var express = require('express');
var router = express.Router();
var path = require("path");
var pg = require('pg');
var bodyParser = require('body-parser');


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'../../index.html'));
});

var conString = "postgres://forkliftUSER:forklift@localhost:5432/forkliftDB";
var client = new pg.Client(conString);


router.post('/api/cars', function(req, res, next) {
    client.connect(function(err) {
        if(err) {return console.error('could not connect to postgres', err);}
        client.query("INSERT INTO cars(name, capacity) VALUES ($1, $2)", [req.body.name,req.body.capacity],function(err, result) {
            if(err) {return console.error('error running query', err);}
            res.status(201).json(req.body);
        });
    });
});

//router.delete('api/cars/:carId', function(req, res){
//    client.connect(function(err) {
//        if(err) {return console.error('could not connect to postgres', err);}
//        client.query("DELETE FROM cars WHERE id = ($1)", [req.body],function(err, result) {
//            if(err) {return console.error('error running query', err);}
//            console.log('========================================');
//            res.status(204);
//        });
//    });
//});

module.exports = router;
