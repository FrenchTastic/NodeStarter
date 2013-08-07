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

exports.get = function (req, res) {
  res.json(data);
};

exports.postTweet = function (req, res) {
	if(req.user !== undefined)
	{
		res.json({'msg':'Daily Tweet envoyé pour approbation.'})
	}
	else
	{
		res.json({'msg':'Pour soumettre un Daily Tweet, connectes toi !'});
	}

};