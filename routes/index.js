
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express', user: req.user });
};

exports.connected = function(req, res){
  console.log("Banane et steak " + req.user.provider)
  res.render('index', { title: 'Coicoin', user: req.user });
};

exports.admin = function(req, res){
	console.log("Banane et steak ");
	res.render('admin');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};
