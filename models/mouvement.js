let mongoose = require('mongoose');

var MouvementSchema = mongoose.Schema({
    compte_id: { type: mongoose.SchemaTypes.ObjectId },
    montant: { type: Number },
    date: { type: Number, max: Date.now() },
});

MouvementSchema.plugin(passportLocalMongoose);

var Mouvement = mongoose.model('Mouvement', MouvementSchema);

module.exports = Mouvement;