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
            "created_at": "Sun Feb 09 8:55:34 +0000 2014",
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
            "created_at": "Sun Feb 09 8:50:34 +0000 2014",
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
            "text": "Wow this game is so good! #WorldCup",
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
        }

    ]);
});

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
