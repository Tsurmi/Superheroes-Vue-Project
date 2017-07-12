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
});

module.exports = Router;
