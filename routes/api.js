var data = [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ];
	
var articles = [
	{
		"title": "Premier article",
		"text":"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
		"images" : ["http://www.hostpaperz.com/wp-content/uploads/2013/06/616498554_1357418372.jpg", "http://www.hostpaperz.com/wp-content/uploads/2013/06/616498554_1357418372.jpg", "http://www.hostpaperz.com/wp-content/uploads/2013/06/616498554_1357418372.jpg"]
	},
	{
		"title": "Second article",
		"text":"On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction. Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement (histoire d'y rajouter de petits clins d'oeil, voire des phrases embarassantes).",
		"images" : ["http://www.hostpaperz.com/wp-content/uploads/2013/06/616498554_1357418372.jpg", "http://www.hostpaperz.com/wp-content/uploads/2013/06/616498554_1357418372.jpg", "http://www.hostpaperz.com/wp-content/uploads/2013/06/616498554_1357418372.jpg"]
	},
	{
		"title": "Troisieme article",
		"text":"Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou là, mais la majeure partie d'entre elles a été altérée par l'addition d'humour ou de mots aléatoires qui ne ressemblent pas une seconde à du texte standard. Si vous voulez utiliser un passage du Lorem Ipsum, vous devez être sûr qu'il n'y a rien d'embarrassant caché dans le texte. Tous les générateurs de Lorem Ipsum sur Internet tendent à reproduire le même extrait sans fin, ce qui fait de lipsum.com le seul vrai générateur de Lorem Ipsum. Iil utilise un dictionnaire de plus de 200 mots latins, en combinaison de plusieurs structures de phrases, pour générer un Lorem Ipsum irréprochable. Le Lorem Ipsum ainsi obtenu ne contient aucune répétition, ni ne contient des mots farfelus, ou des touches d'humour.",
		"images" : ["http://www.hostpaperz.com/wp-content/uploads/2013/06/616498554_1357418372.jpg", "http://www.hostpaperz.com/wp-content/uploads/2013/06/616498554_1357418372.jpg", "http://www.hostpaperz.com/wp-content/uploads/2013/06/616498554_1357418372.jpg"]
	}
];

var mongoose = require('mongoose');
var kittySchema = mongoose.Schema({
	name: String
});

var articlesSchema = mongoose.Schema({
	title: String,
	text: String,
	images: [String]
});

var Article = mongoose.model('Article', articlesSchema);

kittySchema.methods.speak = function () {
	var greeting = this.name
		? "Meow name is " + this.name
		: "I don't have a name";
	console.log(greeting);
}
var Kitten = mongoose.model('Kitten', kittySchema);

exports.get = function (req, res) {
  res.json(data);
};

exports.articles = function(req, res) {
	var mongoArticles;
	var numArticles;
	if(req.query.page)
	{
		var pageToSkip = req.query.page - 1;
		Article.find({}, null, { skip: pageToSkip, limit: 1}, function (err, articles) {
			res.json(articles);
		});
	}
};

exports.article = function(req, res) {
	var mongoArticles;
	var numArticles;
	if(req.query.id)
	{
		Article.findOne({articleNo: parseInt(req.query.id)}, null, function (err, article) {
			res.json(article);
		});
	}

	
};

exports.postTweet = function (req, res) {
	if(req.user == undefined)
	{
		var fluffy = new Kitten({ name: 'poulet' });
		fluffy.save(function (err, fluffy) {
			if (err)
			{
				console.log('error');
			}
			else
			{
				fluffy.speak();
				Kitten.find(function (err, kittens) {
					console.log(kittens)
				});
				Kitten.find({ name: /^fluff/ }, function (err, docs) {
					console.log(docs);
				});
			}
		});
		res.json({'msg':'Daily Tweet envoyé pour approbation.'})
	}
	else
	{
		res.json({'msg':'Pour soumettre un Daily Tweet, connectes toi !'});
	}
};