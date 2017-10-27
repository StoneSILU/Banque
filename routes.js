let express = require('express');
let Controller = require('./controllers');
let User = require('./models/user');
let passport = require('passport')
, LocalStrategy = require('passport-local').Strategy; 

let router = express.Router();

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.getUserByUsername(username, function(err, user){
			if (err) {
				console.log('erreur bizarre')
			}
			if(!user) {
				return done(null, false, {message: "Unknown User"})
			} 
			User.comparePassword(password, user.password, function(err, isMatch) {
				if (err){
					console.log('erreur bizarre')
				}

				if (isMatch) 
				{
					return done(null, user);
				} 
				else 
				{
					return done(null, false, {message: 'Invalid Password'})
				}
			})
		})
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
		done(err,user);
	})
});

router.route(['/', '/index']).get(
    Controller.getAngularApp
);

router.all("/api/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});

router.get('/login', 
    passport.authenticate('local',{
        session: false
    }),
    Controller.login
);

module.exports = router;