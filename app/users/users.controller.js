var User = require('../users/users.model');
var jwt    = require('jsonwebtoken');
var config = require('../../config/var');

exports.setup = function (req, res) {
    // create a sample user
    var chris = new User({
        username: 'Chris Nwamba',
        password: 'password',
        admin: true
    });

    // save the sample user
    chris.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({
            success: true
        });
    });
};

exports.authorize = function(req,res){

};

exports.isAdmin = function(req,res){

};

exports.authenticate = function (req, res) {

    // find the user
    User.findOne({
        username: req.body.username
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, config.secret, {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
};


exports.verify = function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
};