
let colors = require('colors');

let express = require('express');
let app = express();
let http = require('http').Server(app);
let port = 1339;

let io = require('socket.io').listen(http);


let listener = http.listen(port, '0.0.0.0', function () {
  console.log(' Express -> '.black.bgGreen + (' listening on *:' + port).green);
});

let io = require('socket.io').listen(http);

io.on('connection', function (socket) {

  socket.on('emit', function (msg) {
    socket.broadcast.emit('new message', {
      message: msg
    });
  })
})

let expressJwt = require('express-jwt');
let jwt = require('jsonwebtoken');
app.use('/api', expressJwt({ secret: 'bank' }));

let bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

let expressValidator = require('express-validator');
let expressSession = require('express-session');

app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    let namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

let passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
mongoose.connect('mongodb://stivynho:Undertaker94@airbnpito-shard-00-00-4vdbk.mongodb.net:27017,airbnpito-shard-00-01-4vdbk.mongodb.net:27017,airbnpito-shard-00-02-4vdbk.mongodb.net:27017/bank?ssl=true&replicaSet=AirBnPito-shard-0&authSource=admin');
let db = mongoose.connection;

db.on('error', function () { console.log(' MongoDB -> '.black.bgRed + ' connection error to qwirk@localhost'.red); });
db.once('open', function () { console.log(' MongoDB -> '.black.bgGreen + ' connected to qwirk@localhost'.green); });

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

let fs = require('fs'),
  morgan = require('morgan');
let accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });


app.use(morgan('combined', { stream: accessLogStream }));

let routes = require('./routes');
routes.use(express.static(__dirname + '/app'));

app.use('/', routes);

app.use(expressSession({
  secret: 'secret',
  saveUnitialized: true,
  resave: true
}));



//app.listen(port);




