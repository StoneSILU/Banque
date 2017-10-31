let express = require('express');
let Controller = require('./controllers');
let User = require('./models/user');
let jwt = require('jsonwebtoken');
let passport = require('passport')
, LocalStrategy = require('passport-local').Strategy; 

let router = express.Router();

passport.use(new LocalStrategy(
	function(email, password, done) {
		User.getUserByEmail(email, function(err, user){
			if (err) {
                console.log('erreur bizarre')
                return done("pas d' user")
			}
			if(!user) {
                console.log('pas duser')
				return done(null, false, {message: "Unknown User"})
			} 
			if (user) {
				User.comparePassword(password, user.password, function(err, isMatch) {
					if (err){
						console.log('erreur bizarre')
						return done(null, false, 'erreur')
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
			}
		})
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.getUserByEmail(email, function(err, user) {
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

router.get('/login', function(req, res) {
	res.end('toto')
})

router.post('/login', 
passport.authenticate('local',{
	session: false
}),
function(req, res) {
	let payload = { username: req.user.username, _id: req.user._id }
	let token = jwt.sign(payload, 'qwirk', { expiresIn: 60*60*24 });
	res.status(200);
	res.send(JSON.stringify({
		user: req.user,
		token: token, 
		hasErrors: false,
		message: "You are log"
	}));
    }
);

module.exports = router;