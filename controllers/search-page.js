// function for sending the logged in user to the home page
let handleSearchPage = async (req, res,) => {
    let user = JSON.parse(JSON.stringify(req.user))
    // console.log(user, "user object right before rendering to index of handlebars, home-pagejs")

    // not sure when we need to send more data to render on the home page what parameters handlebars is looking for
    return res.render("search");
};

module.exports = {
    handleSearchPage: handleSearchPage,
};