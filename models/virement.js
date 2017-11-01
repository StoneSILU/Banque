let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


var VirementSchema = mongoose.Schema({
    recipient_id: { type: mongoose.SchemaTypes.ObjectId },
    sender_id: { type: mongoose.SchemaTypes.ObjectId },
    montant: { type: Number },
    date: { type: Number, max: Date.now() },
    iban: { type: String },
});

VirementSchema.statics.getUserVirements = function (user_id, callback) {
    this.find({ sender_id: user_id }, callback)
}

VirementSchema.plugin(passportLocalMongoose);

var Virement = mongoose.model('Virement', VirementSchema);

module.exports = Virement;