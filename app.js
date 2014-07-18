//Add timestamps to all console logs
require('console-stamp')(console, '[HH:MM:ss.l]');

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var https  = require('https');

//FeedData
var FeedData = require('./FeedData');


//Database
var mysql = require('mysql');

var connection = mysql.createConnection({
    host :'localhost',
    user :   'root',
    password : 'gpsocial',
    database : 'gpsocialdb'
});

var OAuth = require('oauth');

var CONSUMER_KEY = 'rziw2sr1LdJCSHa2KiKte7cOA';
var CONSUMER_SECRET = 'RdZqDHYsacJKqfFbStKDUDuE8Z0rNd72nXBEe4TFfS4g6ahEKO';

var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    CONSUMER_KEY,
    CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1'
);

connection.connect(function(err) {
   if (err) {
       throw err;
   }
   console.log('Connected to gpsocialdb');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//TODO: Put into another module
function getFeedDataFromTweet (tweet) {
	var date = new Date(tweet['created_at']),
		twitterFeedData = Object.create(FeedData);
		
	twitterFeedData['feed_source'] = 1;
	twitterFeedData['created_at'] = date.getTime();
	twitterFeedData['message'] = tweet['text'];
	twitterFeedData['author'] = tweet['user']['screen_name'];
	twitterFeedData['profile_img_url'] = tweet['user']['profile_image_url'];
	twitterFeedData['distance'] = 0;
	return twitterFeedData;
}

//TODO: Put into another module
function getFeedDataFromFacebookStatus(fbStatus) {
	var date = new Date(fbStatus['created_time']),
		fbFeedData = Object.create(FeedData),
		id = fbStatus['from']['id'];
		

	fbFeedData['feed_source'] = 2;
	fbFeedData['created_at'] = date.getTime();
	fbFeedData['message'] = fbStatus['message'];
	fbFeedData['author'] = fbStatus['from']['name'];
	fbFeedData['profile_img_url']  = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ75YdOPgXP0AkDYooNoTuaPFd_B6Oqu97Wd4Ohhkq9_ZEdWMJY0Q";
	fbFeedData['distance'] = 0;
	return fbFeedData;
	/*https.get("https://graph.facebook.com/v2.0/" + id + "/picture?redirect=0", function (httpRes) {
		var output = '';
		httpRes.on('data', function (chunk) {
			output += chunk;
		});

		httpRes.on('end', function () {
			var obj = JSON.parse(output);
			fbFeedData['feed_source'] = 2;
			fbFeedData['created_at'] = date.getTime();
			fbFeedData['message'] = fbStatus['message'];
			fbFeedData['author'] = fbStatus['from']['name'];
			fbFeedData['profile_img_url']  = obj['data']['url'];
			fbFeedData['distance'] = 0;
			return fbFeedData;
		});
	});*/
}

function aggregateFeedData (twitterFeed, fbFeed) {
	var i = 0,
		iMax = twitterFeed.length,
		j = 0,
		jMax = fbFeed.length,
		feed = [];
		
	while (i < twitterFeed.length ||  j < fbFeed.length) {
		if (j >= fbFeed.length || (i < twitterFeed.length && twitterFeed[i]['created_at'] >= fbFeed[j]['created_at'])) {
			feed.push(twitterFeed[i]);
			i++;
		}
		else if (i >= twitterFeed.length || (j < fbFeed.length && twitterFeed[i]['created_at'] < fbFeed[j]['created_at'])){
			feed.push(fbFeed[j]);
			j++;
		}
		
	}
	return feed;

}

// test twitter feed get
app.get('/twitterTest', function (req, res) {
    res.type('application/json');
    res.json([
        {
            "created_at": "Tue Jun 25 09:50:14 +0000 2014",
            "id": 20,
            "id_str": "20",
            "text": "Game is being shown at SLC! #Waterloo #WorldCup",
            "source": "web",
            "user": {
                "id": 12,
                "id_str": "12",
                "name": "Jack Dorsey",
                "screen_name": "jack",
                "location": "California",
                "description": "",
                "url": null,
                "entities": {
                    "description": {
                        "urls": []
                    }
                },
                "lang": "en",
                "profile_image_url": "http://pbs.twimg.com/profile_images/448483168580947968/pL4ejHy4_normal.jpeg",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/448483168580947968/pL4ejHy4_normal.jpeg",
            },
            "lang": "en"
        },
        {
            "created_at": "Tue Jun 25 08:59:34 +0000 2014",
            "id": 432656548536401930,
            "id_str": "432656548536401930",
            "text": "Oh no.....",
            "source": "web",
            "user": {
                "id": 2244994951,
                "id_str": "2244994951",
                "name": "Joshy Josh",
                "screen_name": "NoName",
                "location": "Internet",
                "description": "My first and last names are the same names!",
                "url": "https://t.co/66w26cua1O",
                "created_at": "Sat Dec 19 04:35:55 +0000 2013",
                "lang": "en",
                "profile_image_url": "http://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png"
            },
            "lang": "en"
        },
        {
            "created_at": "Tue Jun 25 8:55:34 +0000 2014",
            "id": 432656548536401932,
            "id_str": "432656548536401932",
            "text": "Wow this game is so good! #WorldCup",
            "source": "web",
            "user": {
                "id": 2244994952,
                "id_str": "2244994952",
                "name": "Jane Smith",
                "screen_name": "JaneSmith1234",
                "location": "Internet",
                "description": "Just another girl!",
                "url": "https://t.co/66w26cua1O",
                "created_at": "Sat Dec 14 04:35:55 +0000 2013",
                "lang": "en",
                "profile_image_url": "http://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png"
            },
            "lang": "en"
        },
        {
            "created_at": "Tue Jun 25 8:50:34 +0000 2014",
            "id": 432656548536401931,
            "id_str": "432656548536401931",
            "text": "I wonder how long it took to organize all of this...",
            "source": "web",
            "user": {
                "id": 2244994951,
                "id_str": "2244994951",
                "name": "Smith smit",
                "screen_name": "SmithDaSmith",
                "location": "Internet",
                "description": "I'm just your average smith named Smith!",
                "url": "https://t.co/66w26cua1O",
                "created_at": "Sat Dec 14 04:35:55 +0000 2013",
                "lang": "en",
                "profile_image_url": "http://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png"
            },
            "lang": "en"
        },
        {
            "created_at": "Tue Jun 25 08:45:34 +0000 2014",
            "id": 432656548536401922,
            "id_str": "432656548536401922",
            "text": "This game right now!?!?!?!?!?!??!!??! #WorldCup",
            "source": "web",
            "user": {
                "id": 2244994947,
                "id_str": "2244994947",
                "name": "Daniela A",
                "screen_name": "DaA",
                "location": "Internet",
                "description": "I sing and stuff!",
                "url": "https://t.co/66w26cua1O",
                "created_at": "Sat Dec 21 04:35:55 +0000 2013",
                "lang": "en",
                "profile_image_url": "http://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png"
            },
            "lang": "en"
        },
        {
            "created_at": "Tue Jun 25 8:25:34 +0000 2014",
            "id": 432656548536401929,
            "id_str": "432656548536401929",
            "text": "Everyone ready for the game? #WorldCup",
            "source": "web",
            "user": {
                "id": 2244994949,
                "id_str": "2244994949",
                "name": "Jeffrey Smith",
                "screen_name": "JeffreySmith1234",
                "location": "Internet",
                "description": "Sucks at twitter-ing!",
                "url": "https://t.co/66w26cua1O",
                "created_at": "Sat Dec 21 04:35:55 +0000 2013",
                "lang": "en",
                "profile_image_url": "http://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png"
            },
            "lang": "en"
        },
        {
            "created_at": "Tue Jun 25 07:25:34 +0000 2014",
            "id": 432656548536401921,
            "id_str": "432656548536401921",
            "text": "OMG YELLOW CARD?! WTF someone fire that ref",
            "source": "web",
            "user": {
                "id": 2244994946,
                "id_str": "2244994946",
                "name": "John Doe",
                "screen_name": "TheRealJohnDoe",
                "location": "Internet",
                "description": "Just another dude!",
                "url": "https://t.co/66w26cua1O",
                "created_at": "Sat Dec 19 04:35:55 +0000 2013",
                "lang": "en",
                "profile_image_url": "http://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png"
            },
            "lang": "en"
        },
        {
            "created_at": "Tue Jun 25 07:35:34 +0000 2014",
            "id": 432656548536401941,
            "id_str": "432656548536401941",
            "text": "GOALLLLLLL #ArrivederciItalia",
            "source": "web",
            "user": {
                "id": 2244994946,
                "id_str": "2244994946",
                "name": "John Doe",
                "screen_name": "TheRealJohnDoe",
                "location": "Internet",
                "description": "Just another dude!",
                "url": "https://t.co/66w26cua1O",
                "created_at": "Sat Dec 19 04:35:55 +0000 2013",
                "lang": "en",
                "profile_image_url": "http://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png"
            },
            "lang": "en"
        },
        {
            "created_at": "Tue Jun 25 07:15:34 +0000 2014",
            "id": 432656548536401971,
            "id_str": "432656548536401971",
            "text": "How is that not a yellow card!? BITING!?",
            "source": "web",
            "user": {
                "id": 2244994960,
                "id_str": "2244994960",
                "name": "Jane Though",
                "screen_name": "TheRealJaneThough",
                "location": "Internet",
                "description": "Just another dude!",
                "url": "https://t.co/66w26cua1O",
                "created_at": "Sat Dec 19 04:35:55 +0000 2013",
                "lang": "en",
                "profile_image_url": "http://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png"
            },
            "lang": "en"
        }

    ]);
});

//Profile endpoint test
app.get('/profileTest', function (req, res) {
    res.type('application/json');
    res.json({
        "username": "Joe Smith",
        "twitter_handle":"@joesmith",
        "profile_img_url_tw": "http://png-3.findicons.com/files/icons/1580/devine_icons_part_2/128/account_and_control.png",
        "feed": [
            {
                "feed_source":1,
                "author":"Joe Smith",
                "message":"Who's watching the game? #WorldCup",
                "created_at":1403531574529,
                "profile_img_url":"http://lautechstudents.com/images/profile.png"
            },
            {
                "feed_source": 1,
                "author": "Joe Smith",
                "message":"Go Argentina! #Argentina",
                "created_at":1403531412241,
                "profile_img_url":"http://lautechstudents.com/images/profile.png"
            },
            {
                "feed_source": 1,
                "author": "Joe Smith",
                "message":"I wish I was watching the game right now...........",
                "created_at":1403531412241,
                "profile_img_url":"http://lautechstudents.com/images/profile.png"
            }
        ]
    });
});

//twitter authentication test
//TODO: Parse request JSON, store in DB, return true/false depending if the auth passed is valid
app.post('/authenticate_twitter', function(req, res) {
    //TODO, validate so that the request body sends all these
    //TODO: Make GeoLocation optional parameters
	//TODO: Add a preliminary call to TWITTER verify_credentials
    var twitterId = req.body['userId'],
        token = req.body['token'],
        tokenSecret = req.body['tokenSecret'],
        twQuery,
        uQuery,
        userId = req.query["id"],
        geolng = req.query["lng"],
        geolat = req.query["lat"];

    console.log (twitterId + " " + " " + token + " " + tokenSecret + JSON.stringify(req.body));
    //TODO: Replace queries with better ones
    //TODO: Take measures against SQL Injection
    twQuery = "INSERT INTO twitterauth(TwitterId, OAuthToken, OAuthSecret)" +
        "VALUES ('" + twitterId + "', '" + token + "', '" + tokenSecret + "')" +
        "ON DUPLICATE KEY UPDATE " +
        "OAuthToken=VALUES(OAuthToken), OAuthSecret=VALUES(OAuthSecret);";

    uQuery = typeof userId === "undefined" ? "INSERT IGNORE INTO users(TwitterId)" +
    "VALUES ('" + twitterId + "');" :
	"UPDATE users " +
	"SET TwitterId = " + twitterId + 
	" WHERE UserId = " + userId + ";";

    connection.query(twQuery, function(twErr, twRows, twFields) {
        if (twErr) {
            res.json({success : "false"});
            throw twErr;
        }

        connection.query(uQuery, function (uErr, uRows, uFields) {
            if (uErr) {
                res.json({success : "false"});
                throw uErr;
            }

            connection.query("SELECT * FROM users WHERE TwitterId = '" + twitterId + "' LIMIT 1;", function (err, rows, fields) {
                if (err) {
                    throw err;
                }
                var userId = rows[0].UserId;
                console.log ("UserId" + userId);
				
				//TODO: Better to make a socialMedia table with the associated bit values then use that table to dynamically select and get connectedFlag from users
				connection.query("select ((CASE WHEN TwitterId IS NULL THEN 0 ELSE 1 END) + " +
					"(CASE WHEN FacebookId IS NULL THEN 0 ELSE 2 END)) AS connectedFlag FROM users WHERE UserId = " + userId + " LIMIT 1",
				function (cErr, cRows, cFields) {
					if (cErr) {
						throw cErr;
					}
					var connectedFlag = cRows[0].connectedFlag;
					res.json({success : "true", userId: userId, connectedFlag: connectedFlag});
				});
				
            });

        });
    });

});

//twitter authentication test
//TODO: Parse request JSON, store in DB, return true/false depending if the auth passed is valid
app.post('/authenticate_facebook', function(req, res) {
    //TODO, validate so that the request body sends all these
    //TODO: Make GeoLocation optional parameters
	//TODO: Add a preliminary call to TWITTER verify_credentials
	//TODO: FB tokens expire
    var facebookId = req.body['userId'],
        token = req.body['token'],
        tokenSecret = req.body['tokenSecret'],
        fbQuery,
        uQuery,
        userId = req.body["id"],
        geolng = req.body["lng"],
        geolat = req.body["lat"];

    console.log (facebookId + " " + token + " " + tokenSecret + JSON.stringify(req.body));
    //TODO: Replace queries with better ones
    //TODO: Take measures against SQL Injection
    fbQuery = "INSERT INTO facebookauth(FacebookId, OAuthToken, OAuthSecret)" +
        "VALUES ('" + facebookId + "', '" + token + "', '" + tokenSecret + "')" +
        "ON DUPLICATE KEY UPDATE " +
        "OAuthToken=VALUES(OAuthToken), OAuthSecret=VALUES(OAuthSecret);";

	uQuery = typeof userId === "undefined" ? "INSERT IGNORE INTO users(FacebookId)" +
		"VALUES ('" + facebookId + "');" :
		"UPDATE users " +
		"SET FacebookId = " + facebookId + 
		" WHERE UserId = " + userId + ";";
		
    connection.query(fbQuery, function(fbErr, fbRows, fbfields) {
        if (fbErr) {
            res.json({success : "false"});
            throw fbErr;
        }

        connection.query(uQuery, function (uErr, uRows, uFields) {
            if (uErr) {
                res.json({success : "false"});
                throw uErr;
            }

            connection.query("SELECT * FROM users WHERE FacebookId = '" + facebookId + "' LIMIT 1;", function (err, rows, fields) {
                if (err) {
                    throw err;
                }
                var userId = rows[0].UserId;
                console.log ("UserId" + userId);
				
				//TODO: Better to make a socialMedia table with the associated bit values then use that table to dynamically select and get connectedFlag from users
				connection.query("select ((CASE WHEN TwitterId IS NULL THEN 0 ELSE 1 END) + " +
					"(CASE WHEN FacebookId IS NULL THEN 0 ELSE 2 END)) AS connectedFlag FROM users WHERE UserId = " + userId + " LIMIT 1",
				function (cErr, cRows, cFields) {
					if (cErr) {
						throw cErr;
					}
					var connectedFlag = cRows[0].connectedFlag;
					res.json({success : "true", userId: userId, connectedFlag: connectedFlag});
				});
				
            });

        });
    });

});


app.get('/news_feed', function(req, res){
    var userId = req.query.id,
        geolng = req.query.lng,
        geolat = req.query.lat,
		NUM_OF_TWEETS = 25,
		twitterFeed = [],
		i,
		iMax,
		jsonData,
		options,
		twToken,
		twSecret,
		fbToken,
		facebookFeed = [],
		feed = [];
		
	res.type("application/json");

	options = {
		sql: "SELECT * FROM users u LEFT JOIN twitterauth ta ON u.TwitterId = ta.TwitterId  LEFT JOIN facebookauth fb ON u.FacebookId = fb.FacebookId WHERE u.UserId = '" + userId + "' LIMIT 1", 
		nestTables: true
	}
	
	connection.query(options, function (err, rows) {
		if (err) {
			throw err;
		}

        if (rows.length > 0) {

			if (rows[0].u.TwitterId !== "null") {
				twToken = rows[0].ta.OAuthToken;
				twSecret = rows[0].ta.OAuthSecret;

				oauth.get(
						'https://api.twitter.com/1.1/statuses/home_timeline.json?count=' + NUM_OF_TWEETS,
					twToken,
					twSecret,
					function (e, data, oRes) {
						if (e) {
							console.error(e);
						}
						
						jsonData = JSON.parse(data);
						
						for (i = 0, iMax = jsonData.length; i < iMax; ++i) {
							twitterFeed.push(getFeedDataFromTweet(jsonData[i]));
						}
						
						if (rows[0].u.FacebookId !== "null") {
							fbToken = rows[0].fb.OAuthToken;
					
							https.get("https://graph.facebook.com/v2.0/me/home?access_token=" + fbToken, function(httpRes) {
								var output = '';
								httpRes.on('data', function (chunk) {
									output += chunk;
								});

								httpRes.on('end', function() {
									var obj = JSON.parse(output),
										objData = obj['data'];
									
									console.log(objData);
									
									for (i = 0, iMax = objData.length; i < iMax; ++i) {
										if (objData[i]['type'] === "status") {
											facebookFeed.push(getFeedDataFromFacebookStatus(objData[i]));
										}
									}
									feed = aggregateFeedData(twitterFeed, facebookFeed);
									res.send(feed);
												
								});
							});
						}
						
						
					}
				);
			}
			else if (rows[0].u.FacebookId !== "null") {
				fbToken = rows[0].fb.OAuthToken;
				
				https.get("https://graph.facebook.com/v2.0/me/home?access_token=" + fbToken, function(httpRes) {
					var output = '';
					httpRes.on('data', function (chunk) {
						output += chunk;
					});

					httpRes.on('end', function() {
						var obj = JSON.parse(output),
							objData = obj['data'];
						
						for (i = 0, iMax = objData.length; i < iMax; ++i) {
							if (objData[i]['type'] === "status") {
								facebookFeed.push(getFeedDataFromFacebookStatus(objData[i]));
							}
						}
						res.send(facebookFeed);
					});
				});
				
			}
        }
	});

    //update database with geolocation
    if (typeof geolat !== "undefined" && geolat !== "" && typeof geolng !== "undefined" && geolng !== "") {
        connection.query("UPDATE users " +
                "SET GeoLat= '" + geolat + "', " +
                "GeoLng= '" + geolng + "', " +
                "GeoTime= NOW() " +
                "WHERE UserId = " + userId + ";",
            function (err, rows, fields) {
                if (err) {
                    throw err;
                }
            });
    }
});

//FacebookTest
app.get('/facebookProfileTest', function(req, res) {
	var userId = req.query.id,
		options,
		token;
	
	connection.query("SELECT * FROM facebookauth ta INNER JOIN users u ON u.FacebookId = ta.FacebookId WHERE u.UserId = '" + userId + "' LIMIT 1", function (err, rows, fields) {
		token = rows[0].OAuthToken;
		
		https.get("https://graph.facebook.com/v2.0/me?access_token=" + token, function(httpRes) {
			var output = '';
			httpRes.on('data', function (chunk) {
				output += chunk;
			});

			httpRes.on('end', function() {
				var obj = JSON.parse(output);
				res.send(obj);
			});
		});
	});
	
});

//FacebookTest
app.get('/facebookPictureTest', function(req, res) {
	var userId = req.query.id,
		options,
		token;
	
	var headers = {
		"Content-Type" : "application/json"
	};
	
	options = {
		host: "graph.facebook.com",
		port: 443,
		path: "/v2.0/?access_token=CAAEEv1osbPEBABiDyimZCAy3GPdsXPjqEero4fxjpWlUbhz0flAh4jmZCCGkWknSj9OAko6sVTAhlmL7RII2nmFZA6kqQZC4KHs31pBqnJsavZALkaAnU38MZAwGB850UZCrqpMip3Yj9naaNdhGpxzieBNNBfqzIgNdepufYKyaJ5cSseDunnZC",
		method: "POST",
		headers: headers
	};
	
	var req = https.request(options, function(httpRes) {
		var output = '';
		httpRes.on('data', function (chunk) {
			output += chunk;
		});

		httpRes.on('end', function() {
			var obj = JSON.parse(output);
			res.send(obj);
		});
	});
	var json = JSON.stringify([{"method":"GET","relative_url":"10154367774970051/picture"},{"method":"GET","relative_url":"658365934252121/picture"}]);
	console.log(json);
	req.write("batch=" + json);
	req.end();
	
});

//FacebookTest
app.get('/facebookNewsFeedTest', function(req, res) {
	var userId = req.query.id,
		options,
		token;
	
	connection.query("SELECT * FROM facebookauth ta INNER JOIN users u ON u.FacebookId = ta.FacebookId WHERE u.UserId = '" + userId + "' LIMIT 1", function (err, rows, fields) {
		token = rows[0].OAuthToken;
		
		https.get("https://graph.facebook.com/v2.0/me/home?access_token=" + token, function(httpRes) {
			var output = '';
			httpRes.on('data', function (chunk) {
				output += chunk;
			});

			httpRes.on('end', function() {
				var obj = JSON.parse(output);
				res.send(obj);
			});
		});
	});
	
});

app.get('/users_near_me', function (req, res) {
	var userId = req.query.id,
		results = [],
		userData,
		i,
		iMax,
		options;
	
	res.type('application/json');
	
	options = {
		sql: "SELECT * FROM users u LEFT JOIN twitterauth ta ON u.TwitterId = ta.TwitterId LEFT JOIN facebookauth fb ON u.FacebookId = fb.FacebookId WHERE UserId <> " + userId + ";",
		nestTables: true
	}
	
	connection.query(options, function (err, rows) {
	
		if (rows.length > 0) {
			for (i = 0, iMax = rows.length; i < iMax; ++i) {
				userData = {
					id: rows[i].u.UserId,
					user_name: "",
					lng: rows[i].u.GeoLng,
					lat: rows[i].u.GeoLat
				};
				results.push(userData);
			}
			res.send(results);
		}
		else {
			res.send([]);
		}
	
	});
	
	/*res.send([
					{
					"id": 1,
					"user_name": "Fred",
					"lng": "43.470241",
					"lat": "-80.540792"
					},
					{
					"id": 3,
					"user_name": "Tom",
					"lng": "43.472803",
					"lat": "-80.535299"
					}
	]);*/

});


app.get('/profile', function(req, res) {
    var userId = req.query.id,
        geolng = req.query.lng,
        geolat = req.query.lat,
		twResult = null,
		userTwitterInfo,
		userTweets,
		userTweetsFeedData,
        fbResult = null,
		i,
		iMax,
        result,
		feed = [],
		fbFeedData,
		fbFeed = [];

    res.type('application/json');

    //TODO: Modularize the following query
    //TODO: Custom select query to get all social media id's then dynamically build queries from it
	connection.query("SELECT * FROM twitterauth ta INNER JOIN users u ON u.TwitterId = ta.TwitterId WHERE u.UserId = '" + userId + "' LIMIT 1", function (err, rows, fields) {
		if (err) {
			throw err;
		}

        if (rows.length > 0) {

            var token = rows[0].OAuthToken,
                tokenSecret = rows[0].OAuthSecret,
                twitterId = rows[0].TwitterId;

            oauth.get(
                    'https://api.twitter.com/1.1/users/show.json?user_id=' + twitterId,
                token,
                tokenSecret,
                function (e, userData, oRes) {
                    if (e) {
                        console.error(e);
                    }
                    userTwitterInfo = JSON.parse(userData);

                    oauth.get(
                            'https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=' + twitterId,
                        token,
                        tokenSecret,
                        function (e, tweetData, oRes) {
                            if (e) {
                                console.error(e);
                            }
                            userTweets = JSON.parse(tweetData);
							userTweetsFeedData = [];

                            for (i = 0, iMax = userTweets.length; i < iMax; ++i) {
                                userTweetsFeedData.push(getFeedDataFromTweet(userTweets[i]));
                            }
                            twResult = {
                                name: userTwitterInfo['name'],
                                twitter_handle: "@" + userTwitterInfo['screen_name'],
                                profile_img_url: userTwitterInfo["profile_image_url"],
                                feed: userTweetsFeedData
                            };

                            //TODO: Modularize
                            //facebook
                            connection.query("SELECT * FROM facebookauth fb INNER JOIN users u ON u.FacebookId = fb.FacebookId WHERE u.UserId = '" + userId + "' LIMIT 1", function (err, rows, fields) {
                                if (err) {
                                    throw err;
                                }

                                if (rows.length > 0) {

                                    var token = rows[0].OAuthToken;
                                    https.get("https://graph.facebook.com/v2.0/me?access_token=" + token, function (httpRes) {
                                        var output = '';
                                        httpRes.on('data', function (chunk) {
                                            output += chunk;
                                        });

                                        httpRes.on('end', function () {
                                            var obj = JSON.parse(output);
                                            fbResult = obj;
											
											https.get("https://graph.facebook.com/v2.0/me/picture?redirect=0&access_token=" + token, function (httpRes) {
												var output = '';
												httpRes.on('data', function (chunk) {
													output += chunk;
												});

												httpRes.on('end', function () {
													var obj = JSON.parse(output);
													fbResult["profile_img_url"] = obj['data']['url'];
													https.get("https://graph.facebook.com/v2.0/me/statuses?access_token=" + token, function (httpRes) {
														var output = '';
														httpRes.on('data', function (chunk) {
															output += chunk;
														});

														httpRes.on('end', function () {
															var obj = JSON.parse(output),
																objData = obj['data'];
															
															for (i = 0, iMax = objData.length; i < iMax; ++i) {
																var date = new Date(objData[i]['updated_time']),
																fbFeedData = Object.create(FeedData);
																
																fbFeedData['feed_source'] = 2;
																fbFeedData['created_at'] = date.getTime();
																fbFeedData['message'] = objData[i]['message'];
																fbFeedData['author'] = objData[i]['from']['name'];
																fbFeedData['profile_img_url'] = fbResult["profile_img_url"];
																fbFeedData['distance'] = 0;
																
																fbFeed.push(fbFeedData);
															}
															feed = aggregateFeedData(twResult['feed'], fbFeed);
															result = {
																name: (typeof twResult !== "null") ? twResult['name'] : "",
																twitter_handle: (typeof twResult !== "null") ? twResult['twitter_handle'] : "",
																profile_img_url: (typeof twResult !== "null") ? twResult["profile_img_url"] : "",
																feed: feed
															};
															res.send(result);
														});
													});
												});
											});
											
                                        });
                                    });

                                }
								else {
									result = {
										name: (typeof twResult !== "null") ? twResult['name'] : "",
										twitter_handle: (typeof twResult !== "null") ? twResult['twitter_handle'] : "",
										profile_img_url: (typeof twResult !== "null") ? twResult["profile_img_url"] : "",
										feed: (typeof twResult !== "null") ? twResult["feed"] : []
									};
									res.send(result);
								}



                            });
                        }
                    );
                }
            );
        }
		else {
			//facebook
			connection.query("SELECT * FROM facebookauth fb INNER JOIN users u ON u.FacebookId = fb.FacebookId WHERE u.UserId = '" + userId + "' LIMIT 1", function (err, rows, fields) {
				if (err) {
					throw err;
				}

				if (rows.length > 0) {

					var token = rows[0].OAuthToken;
					https.get("https://graph.facebook.com/v2.0/me?access_token=" + token, function (httpRes) {
						var output = '';
						httpRes.on('data', function (chunk) {
							output += chunk;
						});

						httpRes.on('end', function () {
							var obj = JSON.parse(output);
							fbResult = obj;
							result = {
								name: (typeof fbResult !== "null") ? fbResult["name"] : "",
								twitter_handle: "",
								feed: []
							};
						});
						
						https.get("https://graph.facebook.com/v2.0/me/picture?redirect=0&access_token=" + token, function (httpRes) {
							var output = '';
							httpRes.on('data', function (chunk) {
								output += chunk;
							});

							httpRes.on('end', function () {
								var obj = JSON.parse(output);
								result["profile_img_url"] = obj['data']['url'];
								https.get("https://graph.facebook.com/v2.0/me/statuses?access_token=" + token, function (httpRes) {
									var output = '';
									httpRes.on('data', function (chunk) {
										output += chunk;
									});

									httpRes.on('end', function () {
										var obj = JSON.parse(output),
											objData = obj['data'];
										
										for (i = 0, iMax = objData.length; i < iMax; ++i) {
											var date = new Date(objData[i]['updated_time']),
											fbFeedData = Object.create(FeedData);
											
											fbFeedData['feed_source'] = 2;
											fbFeedData['created_at'] = date.getTime();
											fbFeedData['message'] = objData[i]['message'];
											fbFeedData['author'] = objData[i]['from']['name'];
											fbFeedData['profile_img_url'] = result["profile_img_url"];
											fbFeedData['distance'] = 0;
											
											feed.push(fbFeedData);
										}
										result['feed'] = feed;
										res.send(result);
									});
								});
							});
						});
						
					});

				}
			});
		}
		
	});

	console.log(geolat + " " + geolng);
    //update database with geolocation
    if (typeof geolat !== "undefined" && geolat !== "" && typeof geolng !== "undefined" && geolng !== "") {
        connection.query("UPDATE users " +
            "SET GeoLat= " + geolat + ", " +
            "GeoLng= " + geolng + ", " +
            "GeoTime= NOW() " +
            "WHERE UserId = " + userId + ";",
        function (err, rows, fields) {
            if (err) {
                throw err;
            }
        });
    }
});

app.post('/post_message', function(req, res) {
    var userId = req.body['id'],
        geolng = req.query.lng,
        geolat = req.query.lat,
        message = req.body['message'],
        source = req.body['source'],
        encodedMessage,
        token,
        tokenSecret;

    res.type('application/json');

    console.log("HI " + JSON.stringify(req.body));
    if (typeof message !== "undefined") {

        console.log("HELLO");
        encodedMessage = encodeURIComponent(message);

        //TWITTER
        if (parseInt(source) === 1) {
            connection.query("SELECT * FROM twitterauth ta INNER JOIN users u ON u.TwitterId = ta.TwitterId WHERE u.UserId = '" + userId + "' LIMIT 1", function (err, rows, fields) {
                console.log("LENGTH: " + rows.length);
                if (rows.length > 0) {

                    token = rows[0].OAuthToken;
                    tokenSecret = rows[0].OAuthSecret;
                    console.log("HERE");
                    oauth.post(
                        'https://api.twitter.com/1.1/statuses/update.json?status=' + encodedMessage,
                        token,
                        tokenSecret,
                        {"status": encodedMessage},
                        function (e, data, oRes) {
                            if (e) {
                                console.error(e);
                            }
                            res.send(data);
                        }
                    );

                }
            });
        }

    }


	
});
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

console.log("Web service has started. Listening on port 8080.");

app.listen(8080);

module.exports = app;
