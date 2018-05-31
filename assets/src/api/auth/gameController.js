const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Parties = require('./../parties/parties');


router.post('/create', function(req, res) {

  Parties.create({
    joueur1: req.body.joueur1,
    joueur2: req.body.joueur2,
    vainqueur: req.body.v
  },
  function (err, parties) {
    if (err) return res.status(500).send("Un problème est survenu lors de l'enregistrement de la parties.")
    });
    res.status(200).send(parties);
  });
});

router.get('/search', function(req, res, next) {

  Parties.findById(req.partiesId, { password: 0 }, function (err, parties) {
      if (err)
        return res.status(500).send("Un problème est survenu lors de la recherche de la parties.");

      if (!parties)
        return res.status(404).send("Aucune parties trouvées.");

    res.status(200).send(parties);
  });
});


module.exports = router;
