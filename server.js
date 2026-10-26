// server.js

// set up ======================================================================
// get all the tools we need
let express  = require('express');
let app      = express();
let port     = process.env.PORT || 3000;
const {ObjectID} = require('mongodb') // same same - lower lev - write req in mongo
let mongoose = require('mongoose'); // same same
let passport = require('passport');
let flash    = require('connect-flash'); // attach info to session - middleware

let morgan       = require('morgan'); // logger - middleware
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser'); // automatically included w express now - line can be deleted
let session      = require('express-session');

let configDB = require('./config/.env');
let db

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  //lhs is a imported function
  // const lilFunction = require('./app/routes.js')
  // lilFunction(app, passport, db);
  
  require('./app/routes.js')(app, passport, db, ObjectID);
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

//transforms ejs into html
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
//used for managing session information on an express object
//changes propogate on express objects
app.use(session({
    secret: 'rcbootcamp2021b', // session secret
    resave: true,
    saveUninitialized: true
}));
//requests are ephemeral
app.use(passport.initialize()); // dis why needs to be re-initialized on each request
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
