// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");

const passport = require('passport');

const app = express();

const PORT = process.env.PORT || 8080;

const exphbs = require('express-handlebars');

const db = require("./models");

const bcrypt = require('bcrypt');

const flash = require('express-flash');

const path = require('path')

const methodOverride = require('method-override');

const session = require('express-session');

const initialize = require('./passport-config');

const connectFlash = require('connect-flash');

const configViewEngine = require('./config/viewEngine');

const initWebRoutes = require('./routes/user');


// var userRoute = require('./routes/user');

// // app.set("view engine", "handlebars");

// app.use(express.urlencoded({ extended: false }));
// // stopping point -p
// // initialize(passport, email => users.find(user => user.email === email), id => users.find(user => user.id === id));

// // app.set('view engine', '.hbs');

// // app.set('views', path.join(__dirname, 'views'));

// // app.use(express.static('public'));
// configViewEngine(app)
// app.use(connectFlash());

// // app.engine("handlebars", exphbs({ defaultLayout: "main" }));


// app.use(express.json());

// app.use(express.urlencoded({ extended: false }));

// //  app.use(express.cookieParser({secret: process.env.SESSION_SECRET}));

// // app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitized: false}));
// // app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// app.use(passport.initialize());

// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: false,
//   cookie: {
//       maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
//   }
// }));
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(methodOverride('_method'))
// // Routes Example 
// // =============================================================
// // user login route
// // require("./routes/chicken-api-route")(app);
// // app.use(userRoute)
// initWebRoutes(app);

// // Syncing our sequelize models and then starting our Express app
// // =============================================================
// // sequelize isn't correctly set up just yet -{}
// // db.sequelize.sync({ force: true }).then(function () {
// //   app.listen(PORT, function () {
// //     console.log("App listening on PORT " + PORT);
// //   });
// // });
// app.listen(PORT, function () {
//   console.log("App listening on PORT " + PORT);
// });
  
// require('dotenv').config();
// import express from "express";
// import configViewEngine from "./configs/viewEngine";
// import initWebRoutes from "./routes/web";
// import bodyParser from "body-parser";
// import cookieParser from 'cookie-parser';
// import session from "express-session";
// import connectFlash from "connect-flash";
// import passport from "passport";
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));
app.set("view engine", "handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config view engine
// configViewEngine(app);

//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Building a login system with NodeJS is running on port ${port}!`));