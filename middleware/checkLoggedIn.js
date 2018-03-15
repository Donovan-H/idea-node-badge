module.exports = (req, res, next) => {
    if (!req.session.access_token) {
        return res.redirect(process.env.IDEA_SITE);
    }
    next();
};