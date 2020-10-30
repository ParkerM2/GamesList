// function for sending the logged in user to the home page
let handleHelloWorld = async (req, res,) => {
    let user = JSON.parse(JSON.stringify(req.user))

    // not sure when we need to send more data to render on the home page what parameters handlebars is looking for
    return res.render("index", user);
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};