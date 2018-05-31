const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Saves = require('./../saves/saves');


router.post('/sauvegarde', function(req, res) {

  Saves.create({
    id_users: req.body.id_users,
    game: req.body.game
  },
  function (err, saves) {
    if (err) return res.status(500).send("Un problème est survenu lors de l'enregistrement de la sauvegardes.")
    });
    res.status(200).send(saves);
});

router.get('/reprendre', function(req, res, next) {

  Saves.findOne({ id_users: req.body.id_users }, function (err, user) {

    if (err)
      return res.status(500).send("Un problème est survenu lors de la recherche de la sauvegardes.");

    if (!saves)
      return res.status(404).send("Aucune sauvegardes trouvées.");
      
    res.status(200).send(saves);
  });
});


module.exports = router;
