let mongoose = require('mongoose');

var MouvementSchema = mongoose.Schema({
    recipient_id: { type: mongoose.SchemaTypes.ObjectId },
    sender_id: { type: mongoose.SchemaTypes.ObjectId },
    montant: { type: Number },
    date: { type: Number, max: Date.now() },
    iban: { type: String },
});

MouvementSchema.plugin(passportLocalMongoose);

var Mouvement = mongoose.model('Mouvement', MouvementSchema);

module.exports = Mouvement;