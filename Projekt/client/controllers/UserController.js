var rp = require('request-promise');

module.exports = {


    logout: function(req, res) {
        req.session.destroy();
        res.redirect('/');
    },



    signup: function(req, res) {
      var data = {
          session: req.session
      };
        res.render('user/signup', data);
    },


    signuppost: function(req, res) {
        var user = req.body.userName;
        var passwd = req.body.password;
        var mail = req.body.mail;
        var options = {
            uri: 'http://127.0.0.1:3000/signup',
            method: 'POST',
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': {
                    "user": user,
                    "passwd": passwd,
                    "mail": mail
                }.length
            },
            body: {

                "user": user,
                "passwd": passwd,
                "mail": mail

            },
            json: true // Automatically parses the JSON string in the response
        };

        rp(options)
            .then(function(response) {
                console.log(response);
                if(response=="username taken"){
                  res.send("username taken");
                }
                res.redirect('/');

            })
            .catch(function(err) {
                var data = {
                    message: "Feler beim Account erstellen",
                    code: err.statusCode
                };
                res.render('error', err);
            });
    },

    login: function(req, res) {
        var user = req.body.userName;
        var passwd = req.body.password;
        var remember = req.body.remember;
        console.log(user+passwd+remember);
        var options = {
            uri: 'http://127.0.0.1:3000/login',
            method: 'POST',
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': {
                    "user": user,
                    "passwd": passwd
                }.length
            },
            body: {

                "user": user,
                "passwd": passwd

            },
            json: true // Automatically parses the JSON string in the response
        };

        rp(options)
            .then(function(response) {
                req.session.userName = user;
                req.session.userId = response.id;
                if (remember == "on") {
                    req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
                }
                res.redirect('/');
            })
            .catch(function(err) {
                res.send("Fail");
            });
    }
};
