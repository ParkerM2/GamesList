let handleHelloWorld = async (req, res) => {
    return res.render("main",{
        user: req.user
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};