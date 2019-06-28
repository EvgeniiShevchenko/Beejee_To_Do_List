const ensureAuthorized = (req, res, next) => {
    if(!req.headers["authorization"]) {
        next();
    }else{
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[2];
            req.token = bearerToken;
            next();
        } 
    }
};

export default ensureAuthorized;