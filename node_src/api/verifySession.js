exports.verifySession = (req, res, next) => {
    if (req.session && req.session.loggedIn === true) {
        console.log("Logged in, you can proceed");
        next();
    } else {
        res.status(403);
        console.log("You must be authenticated to proceed");
        res.send("You must be authenticated");
    }
};