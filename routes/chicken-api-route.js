var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://chicken-coop.p.rapidapi.com/games/%7Btitle%7D?platform=pc",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "chicken-coop.p.rapidapi.com",
		"x-rapidapi-key": "c23b869635mshbd93a4ffe3425ecp12d50bjsnae0f66b387be"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});

// Hey Chambers