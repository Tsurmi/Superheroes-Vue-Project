var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var mainRoutes = require('./routes/main');
var Superhero = require('./models/Superhero'); //node will assume that files are js
var heroRoutes = require('./routes/superheroes');
var app = express();
var port = 3003;

mongoose.connect('mongodb://localhost/superheroes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//app.use("/api/main", mainRoutes);
app.use("/api/heroes", heroRoutes);
//links the html,css and js files together
app.use(express.static(__dirname + '/public'));



//req is an object
// params is an unique identifier
//findById method to spice out the req.params._id)
app.get('/api/heroes/:_id', function(req,res){
  Superhero.findById(req.params._id, function(err, superhero){
    if (err){
      res.send(err)
    }else{
      res.json({data: superhero, message: "Hero received"});
    }
  });
});
app.delete("/api/heroes/:_id", function(req,res){
  Superhero.remove({_id: req.params._id}, function(err){
    if(err){
      res.send(err)
    }else{
      res.send("Superhero Deleted!");
    }
  });
});

var server = app.listen(port, function(){
  console.log("Listening on port:",port);
});
