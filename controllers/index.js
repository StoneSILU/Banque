let passport = require('passport')
, LocalStrategy = require('passport-local').Strategy; 
let User = require('../models/user');
let jwt = require('jsonwebtoken');


module.exports = {
    getAngularApp: function(request, response, next) {
        response.sendFile('index.html', {root: './app/src/'}, function(err) {
            if (err) sendJSONError(response, err);
        });
    },
    login: function(req, res) {
        console.log('login')
        res.end('toto')
    } 
}
function sendJSONError(response, msg, data) {
    var error = { error: msg };
    if (data) error.data = data;
    response.status(500);
    response.send(JSON.stringify(error));
}