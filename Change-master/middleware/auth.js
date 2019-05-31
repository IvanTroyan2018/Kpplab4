module.exports = function auth (req, res , next) {

    if(!req.session.username){
        res.redirect('/');
    } else {
        next();
    }
};