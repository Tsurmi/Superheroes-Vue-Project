var express = require('express');
var Router = express.Router();
var Superhero = require('../models/Superhero');

Router.route('/').get(function(req,res){
  Superhero.find(function(err, superheroes){
    if(err){
      res.send(err);
    }else{
      res.json({data: superheroes});
    }
  });
}).post(function(req,res){
  console.log("Hitting the post");
  var superhero = new Superhero();
  superhero.name = req.body.name;
  superhero.superpower = req.body.superpower;
  superhero.img = req.body.img;
  // when using .save and .then your sucess comes first and then your error
  superhero.save().then(function(superhero){
    res.json({message:"Hero succesfully created", data: superhero});
  }, function(err) {
    res.send(err);
  });
});

Router.route('/:_id').get(function(req,res){
  Superhero.findById(req.params._id, function(err, superhero){
      console.log("found superhero", superhero);
      res.send('found superhero');
  });
});

module.exports = Router;
