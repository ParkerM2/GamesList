// dependencies
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const chickenApi = require('./routes/chicken-api-route');

const express = require("express");

const passport = require('passport');

const app = express();

const exphbs = require('express-handlebars');

const session = require('express-session');

const connectFlash = require('connect-flash');

const initWebRoutes = require('./routes/user');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

// const getAPI = require('./controllers/user-controller');

// getAPI();
const apiRoute = require('./routes/userpage-routes');

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

//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());

app.use(passport.session());



// init all web routes
initWebRoutes(app);
apiRoute.userPageRender(app)

// await chickenApi.searchAPI("half-Life");

let port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Building a login system with NodeJS is running on port ${port}!`));