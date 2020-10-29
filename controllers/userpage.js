// function for sending the user to their page with games
let handleUserPage = async (req, res) => {
    let game = JSON.parse(JSON.stringify(req.game))
    console.log(game, "game, in handleuserpage, userpage.js")
    // not sure when we need to send more data to render on the home page what parameters handlebars is looking for
    return res.render("user", game);
};

module.exports = {
    handleUserPage: handleUserPage,
};
