const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const config = require ('./../../../../config');
const verifyToken = require ('./verifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const User = require('./../user/user');


router.post('/register', function(req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  },
  function (err, user) {
    if (err) return res.status(500).send("Un problème est survenu lors de l'enregistrement de l'utilisateur.")
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});

router.get('/me', verifyToken, function(req, res, next) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err)
        return res.status(500).send("Un problème est survenu lors de la recherche de l'utilisateur.");

      if (!user)
        return res.status(404).send("Aucun utilisateur trouvé.");

    res.status(200).send(user);
  });
});

router.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {

    if (err)
      return res.status(500).send('Erreur sur le serveur.');

    if (!user)
      return res.status(404).send('Aucun utilisateur trouvé.');

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user._id }, config.secret, {
      // expiresIn: 86400 // expires dans 24 h
      expiresIn: 3600 //expire dans 1h
    });

    res.status(200).send({ auth: true, token: token });
  });
});

module.exports = router;
