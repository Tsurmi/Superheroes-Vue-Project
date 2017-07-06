var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Superhero = require('./models/Superhero');
var app = express();
var port = 3003;

mongoose.connect('mongodb://localhost/superheroes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//links the html,css and js files together
app.use(express.static(__dirname + '/public'));


app.get('/', function(req,res){
  Superhero.find(function(err,superheroes){
    if (err) throw err;
    res.json({data: superheroes, message: 'Heroes successfully received!'});
  });
});
//req is an object
// params is an unique identifier
//findById method to spice out the req.params._id)
app.get('/:_id', function(req,res){
  Superhero.findById(req.params._id, function(err, superhero){
    if (err) throw err;
    res.json({data: superhero, message: "Hero received"});
  });
});



app.post('/', function(req, res) {
  var superhero = new Superhero();
  superhero.name = req.body.name;
  superhero.superpower = req.body.superpower;

  superhero.save().then(function(superhero){
    res.send(superhero);
  }, function(err) {
    res.send(err);
  });
});
var server = app.listen(port, function(){
  console.log("Listening on port:",port);
});
