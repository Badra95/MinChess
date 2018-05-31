const jwt = require('jsonwebtoken');
const config = require('./../../../../config');

function verifyToken(req, res, next) {

  const token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'Aucun token fourni' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: "Impossible d'authentifier le token." });

    // si tout va bien, enregistrer pour demander l'utilisation dans d'autres routes
    req.userId = decoded.id;
    next();
  });
}
module.exports = verifyToken;
