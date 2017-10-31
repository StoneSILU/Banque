let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
let Hash = require('password-hash');

var UserSchema = mongoose.Schema({
    firstName: { type: String, maxlength: 50 },
    lastName: { type: String, maxlength: 50 },
    email: { type: String, unique: true },
    password: {
        type: String, set: function (newValue) {
            return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
        }
    },
});


UserSchema.statics.authenticate = function (email, password, callback) {
    this.findOne({ email: email }, function (error, user) {
        if (user && Hash.verify(password, user.password)) {
            callback(null, user);
        } else if (user || !error) {
            // Email or password was invalid (no MongoDB error)
            error = new Error("Your email address or password is invalid. Please try again.");
            callback(error, null);
        } else {
            // Something bad happened with MongoDB. You shouldn't run into this often.
            callback(error, null);
        }
    });
};

UserSchema.statics.createUser = function (newUser, callback) {
    this.findOne({ email: newUser.email }, function (error, user) {
        if (user) {
            callback("User already exists")
            return;
        } else {
            if (!Hash.isHashed(newUser.password)) {
                Hash.generate(newUser.password);
            }
            newUser.save(callback);
        }
    })
}

UserSchema.statics.getProfilePic = function (id, callback) {
    this.findOne({ ID: id }, { profilePicture: 1 }, callback);
}

UserSchema.statics.getUserByEmail = function (email, callback) {
    this.findOne({ email: email }, callback);
}

UserSchema.statics.getUser = function (id, callback) {
    this.findOne({ _id: id }, callback);
}

UserSchema.statics.deleteContact = function (infos, callback) {
    this.findOneAndUpdate({ _id: infos.owner }, { $pull: { contactList: { username: infos.username } } }, callback);
}

UserSchema.statics.comparePassword = function (candidatePassword, password, callback) {
    if (Hash.verify(candidatePassword, password)) {
        callback(null, true);
    } else {
        // Something bad happened with MongoDB. You shouldn't run into this often.
        callback("Invalid password", false);
    }
}

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);

module.exports = User;