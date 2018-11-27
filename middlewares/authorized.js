const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // check that authorization header is set
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, function(err, decoded) {
      if(err) {
        // send unauthorized response otherwise
        next(res.status(403).json({
          "error": "Unauthorized - Invalid signature"
        }));
      } else {
        next();
      } 
    });
  } else {
    // send unauthorized response otherwise
    next(res.status(403).json({
      "error": "Unauthorized - No header set"
    }));
  }
};