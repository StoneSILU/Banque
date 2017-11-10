let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


var VirementSchema = mongoose.Schema({
    recipient_iban: { type: String },
    sender_id: { type: String },
    montant: { type: Number },
    date: { type: Number },
});

VirementSchema.statics.getUserVirements = function (user_id, callback) {
    this.find({ sender_id: user_id }, callback)
}

VirementSchema.plugin(passportLocalMongoose);

var Virement = mongoose.model('Virement', VirementSchema);

module.exports = Virement;