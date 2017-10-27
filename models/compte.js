let mongoose = require('mongoose');

var CompteSchema = mongoose.Schema({
    owner_id: { type: mongoose.SchemaTypes.ObjectId },
    solde: { type: Number },
    creaton_date: { type: Number, max: Date.now() },
    iban: { type: String },
});

CompteSchema.plugin(passportLocalMongoose);

var Compte = mongoose.model('Mouvement', CompteSchema);

module.exports = Compte;