let passport = require('passport')
, LocalStrategy = require('passport-local').Strategy; 
let User = require('../models/user');
let jwt = require('jsonwebtoken');


module.exports = {
    getAngularApp: function(request, response, next) {
        response.sendFile('index.html', {root: './app/'}, function(err) {
            if (err) sendJSONError(response, 'Erreur server angular app');
        });
    },
    login: function(req, res) {

    } 
}