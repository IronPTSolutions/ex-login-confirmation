const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');

const mailer = require('../services/mailer.service');

module.exports.create = (req, res, next) => {
  res.render('users/create');
}

module.exports.doCreate = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.render('users/create', {
          user: req.body,
          errors: { email: 'Email already registered' }
        });
      } else {
        user = new User ({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        return user.save()
          
      }
    })
    .then((user) => {
      res.redirect('/sessions/create')
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/create', {
          user: req.body,
          errors: error.errors
        });
      } else {
        next(error);
      }
    })
}

module.exports.confirm = (req, res, next) => {
}
