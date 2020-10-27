var req = unirest("GET", "https://chicken-coop.p.rapidapi.com/games");

req.query({
	"title": "tomb raider"
});

req.headers({
	"x-rapidapi-host": "chicken-coop.p.rapidapi.com",
	"x-rapidapi-key": "c23b869635mshbd93a4ffe3425ecp12d50bjsnae0f66b387be",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});