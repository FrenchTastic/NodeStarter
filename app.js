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
	, mongoose = require('mongoose')
	, path = require('path');

var app = express();
var GOOGLE_CLIENT_ID = "YOURID";
var GOOGLE_CLIENT_SECRET ="YOURSECRET";
mongoose.connect('mongodb://localhost');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log('Connecté à MongoDb');
});

var userSchema = mongoose.Schema({
	id: String,
	firstname: String,
	lastname : String,
	email : String,
	displayname : String,
	provider: String
});

userSchema.methods.findOrCreate = function(cb){
	var user = this;
	user.model('User').find({ id: this.id, provider: this.provider }, function (err, users){
		if(users.length == 0)
		{
			user.save(function(err, user){
				console.log('Utilisateur créé');
				return cb(null, user);
			});
		} 
		else
		{
			console.log('Utilisateur retourné');
			return cb(null, users[0]);
		}
		//user.model('User').find(user, cb);
	});
}

var User = mongoose.model('User', userSchema);

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.serializeUser(function(user, done) {
	var  mongoUser = new User ({
		id: user.id,
		firstname: user.name.givenName,
		email: user.emails[0],
		lastname: user.name.familyName,
		displayname: user.displayName,
		provider: user.provider
	});
	
	mongoUser.findOrCreate(function(err, user){
		if(err)
		{
			console.log(err);
		}
			console.log(user.displayname + " a été trouvé");
		});
	// mongoUser.save(function(err, mongoUser){
		// console.log('Utilisateur sauvegardé');
	// });
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
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
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/users', user.list);
app.get('/api/someJson', api.get);
app.get('/api/articles', api.articles);
app.get('/api/article', api.article);
app.get('/connected', routes.connected);
app.get('/pardon', routes.admin);
app.get('/pardon/partials/:name', routes.partials);
app.get('/auth/google',passport.authenticate('google'));
app.post('/api/tweet',api.postTweet);


app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/partials/test' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/connected');
    });

app.post('/article', api.postArticle);

app.post('/articleee', function(req, res){
	console.log("patate " + req.params[0]);
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
