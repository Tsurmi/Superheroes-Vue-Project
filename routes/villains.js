var express = require('express');
var Router = express.Router();
var Villain = require('../models/Villain');

Router.route('/')
  .get(function(req,res){
    Villain.find(function(err, villains){
      if(err){
        res.send(err);
      }else{
        res.json({message:"Villains succesfully retrieved", data: villains});
      }
    });
  })
  .post(function(req,res){
    console.log("Hitting the post");
    var villain = new Villain();
    villain.name = req.body.name;
    villain.evilPower = req.body.evilPower;
    villain.img = req.body.img;

    villain.save(function(err, villain){
      if(err){
        res.send(err);
      }else{
        res.json({message: "Villain succesfully posted", data: villain});
      }
    });
  });


module.exports = Router;
