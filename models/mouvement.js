let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

var MouvementSchema = mongoose.Schema({
    compte_id: { type: String },
    montant: { type: Number },
    libelle: { type: String },
    date: { type: Number, max: Date.now() },
});

MouvementSchema.statics.getCompteMouvements = function (compte_id, callback) {
    this.find({ compte_id: compte_id }, callback)
}

MouvementSchema.plugin(passportLocalMongoose);

var Mouvement = mongoose.model('Mouvement', MouvementSchema);

module.exports = Mouvement;