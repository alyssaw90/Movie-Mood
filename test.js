// var express = require("express");
// var session = require('express-session');
// var bodyParser = require("body-parser");
// var bcrypt = require('bcrypt');
// var db = require("./models/index.js");
// var models = require ("./models");
// var expressControllers = require('express-controller');
// var app = express();

// app.set("view engine", "ejs");
// app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(session({
// 	secret: "ilovewatchingmovies",
// 	resave: "false",
// 	saveUninitialized: true
// }))
// expressControllers
// .setDirectory(__dirname + '/controllers')
// .bind(app)


// var moviesSearchUrl ="http://api.themoviedb.org/3/" + process.env.moviedata;


// <% if(user) { %>
// Hello, <b><%= typeof user.name === 'string' ? user.name : 'Unknown' %></b>.
// <% } %>