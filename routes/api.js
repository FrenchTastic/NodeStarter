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

var mongoose = require('mongoose');
var kittySchema = mongoose.Schema({
	name: String
});
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