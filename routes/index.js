
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};


exports.connected = function(req, res){
  console.log("Banane et steak " + req.user.provider)
  res.render('index', { title: 'Coicoin' });
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.merde = function (req, res) {
  res.render('partials/test');
};