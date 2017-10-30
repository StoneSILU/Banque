
var colors = require('colors');

var express = require('express');
var app = express();
var http  = require('http').Server(app);
var port = 1339;

var listener = http.listen(port, '0.0.0.0', function() {
    console.log(' Express -> '.black.bgGreen+(' listening on *:'+port).green);
});

var io = require('socket.io').listen(http);

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
app.use('/api', expressJwt({secret: 'bank'}));

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var expressValidator = require('express-validator');
var expressSession = require('express-session');

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
mongoose.connect('mongodb://stivynho:Undertaker94@airbnpito-shard-00-00-4vdbk.mongodb.net:27017,airbnpito-shard-00-01-4vdbk.mongodb.net:27017,airbnpito-shard-00-02-4vdbk.mongodb.net:27017/test?ssl=true&replicaSet=AirBnPito-shard-0&authSource=admin');
var db = mongoose.connection;

db.on('error', function() { console.log(' MongoDB -> '.black.bgRed+' connection error to qwirk@localhost'.red); });
db.once('open', function() { console.log(' MongoDB -> '.black.bgGreen+' connected to qwirk@localhost'.green); });

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

var fs = require('fs'),
    morgan = require('morgan');
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});


app.use(morgan('combined', {stream: accessLogStream}));

var routes = require('./routes');
routes.use(express.static(__dirname + '/app'));

app.use('/', routes);

app.use(expressSession({
    secret: 'secret',
    saveUnitialized: true,
    resave: true
}));



//app.listen(port);




