var express = require('express');
var Router = express.Router();
var Superhero = require('../models/Superhero');

Router.route('/')
  .get(function(req,res){
    Superhero.find(function(err, superheroes){
      if(err){
        res.send(err);
      }else{
        res.json({data: superheroes});
      }
    });
  })
  .post(function(req,res){
    console.log("Hitting the post");
    var superhero = new Superhero();
    superhero.name = req.body.name;
    superhero.superpower = req.body.superpower;
    superhero.img = req.body.img;
    // when using .save and .then your sucess comes first and then your error
    superhero.save(function(err, superhero){
      if(err){
        res.send(err);
      }else{
        res.json({message: "Superhero succesfully saved", data: superhero});
      }
    });
  });

Router.route('/:_id')
  .get(function(req,res){
    Superhero.findById(req.params._id, function(err, superhero){
      if(err){
        res.send(err,"error");
      }else{
        res.json({data: superhero, message: "Superhero received"});
      }
    });
  })
  .delete(function(req,res){
    // first parameter is called a search obect (method find also takes a serach object)
    Superhero.remove({_id: req.params._id}, function(err) {
      if(err){
        res.send(err);
      }else{
        res.send("Superhero was Deleted!");
      }
    });
  });

module.exports = Router;

//req is an object
//params is an unique identifier
//findById method to spice out the req.params._id)
