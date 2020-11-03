// function for sending the logged in user to the home page
let handleHelloWorld = (app) => {
    app.get('/', async (req, res) => {
        //let user = JSON.parse(JSON.stringify(req.user))
        console.log(req.user, "user object right before rendering to index of handlebars, home-pagejs")
        // not sure when we need to send more data to render on the home page what parameters handlebars is looking for
        res.render('index', req.user);
        //res.render("partials/nav-bar",req. user);
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};