/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
	, api = require('./routes/api')
	, passport = require("passport")
  , http = require('http')
	, GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , path = require('path');

var app = express();
var GOOGLE_CLIENT_ID = "YOURCLIENID";
var GOOGLE_CLIENT_SECRET ="YOURCLIENTSECRET";

passport.serializeUser(function(user, done) {
  console.log("Bernard " + user)
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    //returnURL: process.env.IP + '/auth/google/return',
    //realm: process.env.IP
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://pardon.azurewebsites.net/auth/google/callback",
    scope: ['openid', 'email', 'profile'] 
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
		console.log('Coucou Google');
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      done(null, profile, { message:  'cest la merde' });
      // and return that user instead.
    });
  }
));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.cookieParser('keyboard cat'));
app.use(express.session());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());


app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
// app.get('/auth/google', routes.merde);
app.get('/partials/:name', routes.partials);
app.get('/users', user.list);
app.get('/api/someJson', api.get);
app.get('/connected', routes.connected);

app.get('/auth/google',
  passport.authenticate('google'),
  function(req, res){
});


app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/partials/test' }),
function(req, res) {
	// Successful authentication, redirect home.
	res.redirect('/connected');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
