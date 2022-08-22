// middleware below to be required in the index.js routes


module.exports = {
    // enables a check to ensure the user has passed authentication
    ensureAuth: function (req,res,next){
        if(req.isAuthenticated()) {
            return next();
        }
        else {
            res.redirect('/');
        }
    },
    // allows non-authenticated users to see the login page and only that page.
    ensureGuest: function (req,res,next) {
        if(req.isAuthenticated()) {
            res.redirect('/dashboard');
        }
        else{
            return next();
        }
    }
}