let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

var CompteSchema = mongoose.Schema({
    owner_id: { type: String },
    solde: { type: Number },
    creaton_date: { type: Number, max: Date.now() },
    iban: { type: String },
});

CompteSchema.statics.getUserComptes = function (user_id, callback) {
    this.find({ owner_id: user_id } , callback)
}

CompteSchema.plugin(passportLocalMongoose);

var Compte = mongoose.model('Compte', CompteSchema);

module.exports = Compte;