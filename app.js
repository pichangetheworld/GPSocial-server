var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

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

// test twitter feed get
app.get('/twitterTest', function (req, res) {
    res.type('application/json');
    res.json([
        {
            "created_at": "Tue Mar 21 20:50:14 +0000 2006",
            "id": 20,
            "id_str": "20",
            "text": "just setting up my twttr",
            "source": "web",
            "truncated": false,
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
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
                "protected": false,
                "followers_count": 2577282,
                "friends_count": 1085,
                "listed_count": 23163,
                "created_at": "Tue Mar 21 20:50:14 +0000 2006",
                "favourites_count": 2449,
                "utc_offset": -25200,
                "time_zone": "Pacific Time (US & Canada)",
                "geo_enabled": true,
                "verified": true,
                "statuses_count": 14447,
                "lang": "en",
                "contributors_enabled": false,
                "is_translator": false,
                "is_translation_enabled": false,
                "profile_background_color": "EBEBEB",
                "profile_background_image_url": "http://abs.twimg.com/images/themes/theme7/bg.gif",
                "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme7/bg.gif",
                "profile_background_tile": false,
                "profile_image_url": "http://pbs.twimg.com/profile_images/448483168580947968/pL4ejHy4_normal.jpeg",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/448483168580947968/pL4ejHy4_normal.jpeg",
                "profile_banner_url": "https://pbs.twimg.com/profile_banners/12/1347981542",
                "profile_link_color": "990000",
                "profile_sidebar_border_color": "DFDFDF",
                "profile_sidebar_fill_color": "F3F3F3",
                "profile_text_color": "333333",
                "profile_use_background_image": true,
                "default_profile": false,
                "default_profile_image": false,
                "following": true,
                "follow_request_sent": false,
                "notifications": false
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "retweet_count": 23936,
            "favorite_count": 21879,
            "entities": {
                "hashtags": [],
                "symbols": [],
                "urls": [],
                "user_mentions": []
            },
            "favorited": false,
            "retweeted": false,
            "lang": "en"
        },
        {
            "created_at": "Sun Feb 09 23:25:34 +0000 2014",
            "id": 432656548536401920,
            "id_str": "432656548536401920",
            "text": "POST statuses/update. Great way to start. https://t.co/9S8YO69xzf (disclaimer, this was not posted via the API).",
            "source": "web",
            "truncated": false,
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
                "id": 2244994945,
                "id_str": "2244994945",
                "name": "TwitterDev",
                "screen_name": "TwitterDev",
                "location": "Internet",
                "description": "Developers and Platform Relations @Twitter. We are developers advocates. We can't answer all your questions, but we listen to all of them!",
                "url": "https://t.co/66w26cua1O",
                "entities": {
                    "url": {
                        "urls": [
                            {
                                "url": "https://t.co/66w26cua1O",
                                "expanded_url": "https://dev.twitter.com/",
                                "display_url": "dev.twitter.com",
                                "indices": [
                                    0,
                                    23
                                ]
                            }
                        ]
                    },
                    "description": {
                        "urls": []
                    }
                },
                "protected": false,
                "followers_count": 3147,
                "friends_count": 909,
                "listed_count": 53,
                "created_at": "Sat Dec 14 04:35:55 +0000 2013",
                "favourites_count": 61,
                "utc_offset": -25200,
                "time_zone": "Pacific Time (US & Canada)",
                "geo_enabled": false,
                "verified": true,
                "statuses_count": 217,
                "lang": "en",
                "contributors_enabled": false,
                "is_translator": false,
                "is_translation_enabled": false,
                "profile_background_color": "FFFFFF",
                "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
                "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
                "profile_background_tile": false,
                "profile_image_url": "http://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/431949550836662272/A6Ck-0Gx_normal.png",
                "profile_banner_url": "https://pbs.twimg.com/profile_banners/2244994945/1391977747",
                "profile_link_color": "0084B4",
                "profile_sidebar_border_color": "FFFFFF",
                "profile_sidebar_fill_color": "DDEEF6",
                "profile_text_color": "333333",
                "profile_use_background_image": false,
                "default_profile": false,
                "default_profile_image": false,
                "following": true,
                "follow_request_sent": false,
                "notifications": false
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "retweet_count": 1,
            "favorite_count": 5,
            "entities": {
                "hashtags": [],
                "symbols": [],
                "urls": [
                    {
                        "url": "https://t.co/9S8YO69xzf",
                        "expanded_url": "https://dev.twitter.com/docs/api/1.1/post/statuses/update",
                        "display_url": "dev.twitter.com/docs/api/1.1/p…",
                        "indices": [
                            42,
                            65
                        ]
                    }
                ],
                "user_mentions": []
            },
            "favorited": false,
            "retweeted": false,
            "possibly_sensitive": false,
            "lang": "en"
        }
    ]);
});

app.get('/profileTest', function (req, res) {
    res.type('application/json');
    res.json({
        "name" : "GPSocial App",
        "profile_image" : "data:image/jpeg;base64,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",
        "twitter_url" : "https://twitter.com/GPSocialApp"
    });
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
