let passport = require('passport')
, LocalStrategy = require('passport-local').Strategy; 
let User = require('../models/user');
let Compte = require('../models/compte');
let Virement = require('../models/virement');
let Mouvement = require('../models/mouvement');
let jwt = require('jsonwebtoken');


module.exports = {
    getAngularApp: function(req, res, next) {
        res.sendFile('index.html', {root: './app/src/'}, function(err) {
            if (err) sendJSONError(res, err);
        });
    },
    login: function(req, res) {
        console.log('login')
        res.end('toto')
    },
    getComptes: function(req, res) {
        Compte.getUserComptes(req.user._id, (err, comptes) => {
            if (err) {
                res.status(200);
                res.send(JSON.stringify({
                    hasErrors: true,
                    message: 'Get comptes error'
                }));
            }
            if (comptes) {
                res.status(200);
                res.send(JSON.stringify({
                    hasErrors: false,
                    data: comptes
                }));
            }
        })        
    },
    getVirements: function(req, res) {
        Virement.getUserVirements(req.user._id, (err, virements) => {
            if (err) {
                console.log('getComptes erreur')
                res.status(200);
                res.send(JSON.stringify({
                    hasErrors: true,
                    message: 'Get virements error'
                }));
            }
            if (virements) {
                res.status(200);
                res.send(JSON.stringify({
                    hasErrors: false,
                    data: virements
                }));
            }
        })
    },
    getCompteMouvements: function (req, res) {
        console.log('getCompteMouvements')
        let compte_id = req.query.compte_id;
        
        if (compte_id) {
            Mouvement.getCompteMouvements(compte_id, (err, mouvements) => {
                if (err) {
                    res.status(200);
                    res.send(JSON.stringify({
                        hasErrors: true,
                        message: 'Get Compte Mouvement error'
                    }));
                }
                if (mouvements) {
                    res.status(200);
                    res.send(JSON.stringify({
                        hasErrors: false,
                        data: mouvements
                    }));
                }
            })
        }
    }, 
    // createMouvement: function(req, res) {
        
    // },
    addVirement: function(req, res) {
        const dataVirement = {
            recipient_iban: req.body.recipient_iban,
            sender_id: req.user._id,
            date: req.body.date,
            montant: req.body.montant
        }
        let newVirement = new Virement(dataVirement);
        newVirement.save( (err, user) => {
            if (err) {
                res.send({
                    hasErrors: true,
                    data: {
                        message: err
                    }
                })
            } else {
                res.send({
                    hasErrors: false,
                    data: {
                        message: 'virement crée'
                    }
                })
            }
        });
    }
}
function sendJSONError(response, msg, data) {
    var error = { error: msg };
    if (data) error.data = data;
    response.status(500);
    response.send(JSON.stringify(error));
}