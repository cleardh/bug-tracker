require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.signedCookies.token;
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    })
}

module.exports = verifyToken;