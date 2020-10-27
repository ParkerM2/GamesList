let handleHelloWorld = async (req, res) => {
    let user = JSON.parse(JSON.stringify(req.user))
    console.log(user)
    return res.render("index.handlebars",user);
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};