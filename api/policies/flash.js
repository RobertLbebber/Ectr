module.exports = function (req, res, next) {
    res.locals.flash = {};
    console.log("Page Loaded in Policy");
    if (!req.session.flash) return next();
    res.locals.flash = _.clone(req.session.flash);
    req.session.flash = {};
    next();
}