

// function to pull data from chicken-coop api
module.exports = function (app) {
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://rapidapi.p.rapidapi.com/games/%7Btitle%7D?platform=pc",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "chicken-coop.p.rapidapi.com",
			"x-rapidapi-key": "8e8ba0a32emsh895bad159e9c555p14b6a1jsn1a8c5a1f1928"
		}
		// 	};
		// $.ajax(settings).done(function (response) {
		// 		console.log(response);
		// 	});	
	}
};