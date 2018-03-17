const userSchema = require('../models/authModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

let token;

exports.login = (req, res) => {
  console.log(req.body)
  userSchema.findOne({userName: req.body.userName})
  .then((user) => {
    if(!req.body.userName || !req.body.password){
      res.status(401).json({
        message: 'Username and Password are required'
      });
      return;
    }
    if(!user){
      res.status(401).json({
        message: 'The username you entered does not exist'
      });
      return;
    }
    if(!bcrypt.compareSync(req.body.password, user.password)){
      res.status(401).json({
        message: 'Wrong password'
      });
    }
    let userToken = {
      userName: userSchema.userName,
    }
    token = jwt.sign(userToken, config.JWT_SECRET);
    console.log(user)
    res.status(200).json({
      message: `${user.userName} successfully logged in`,
      userId: user._id,
      token: token
    });
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};

exports.register = (req, res) => {
  userSchema.findOne({userName: req.body.userName})
  .then((user) => {
    if(user){
      res.status(401).json({
        message: 'This username is taken. Please try again.'
      });
      return;
    }
    if(!req.body.userName){
      res.status(401).json({
        message: 'Username is required'
      });
      return;
    }
    if(!req.body.password){
      res.status(401).json({
        message: 'Password required'
      });
      return;
    }
    const newUser = new userSchema();
    newUser.userName = req.body.userName;
    bcrypt.hash(req.body.password, 8, (err, hash) => {
      newUser.password = hash;
      newUser.save((err, user) => {
        if(err){
          res.status(500).json({
            message: 'Something bad happened'
          });
        }
        res.status(200).json({
          message: 'New user created',
          data: newUser
        });
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: 'Something bad happened'
      });
    });
  });
}



