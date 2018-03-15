module.exports = function (req, res, next) {
    if (!req.session.access_token) {
        console.log('Unauthorized request.')
        res.status(401).json({error: "Unauthorized request."})
    }
    next();
}