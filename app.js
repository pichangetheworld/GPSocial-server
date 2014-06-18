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
