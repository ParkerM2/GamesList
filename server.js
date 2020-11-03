// dependencies
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");

const morgan = require("morgan");

const passport = require('passport');

const app = express();

const exphbs = require('express-handlebars');

const session = require('express-session');

const connectFlash = require('connect-flash');

const initWebRoutes = require('./routes/user');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const path = require('path');

const apiRoute = require('./routes/userpage-routes');

const { searchPageRender } = require('./routes/searchpage');

const renderWishList = require('./routes/wishlist');

const navBar = require('./controllers/home-page');

app.use(morgan('tiny'));

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

app.engine("handlebars", exphbs({ 
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, 'views/layouts')
 }));

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
apiRoute.userPageRender(app);
searchPageRender(app);
renderWishList.wishListRenderPage(app);
navBar.handleHelloWorld(app);


app.use(express.static(__dirname + '/public'));

let port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Building a login system with NodeJS is running on port ${port}!`));