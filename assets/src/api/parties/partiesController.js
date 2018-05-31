const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Parties = require('./parties');

// CREATES A NEW USER
router.post('/', function (req, res) {
    Parties.create({
            joueur1: req.body.joueur1,
            joueur2: req.body.joueur2,
            vainqueur: req.body.v
        },
        function (err, user) {
            if (err) return res.status(500).send("Un problème est survenu lors de l'ajout des informations à la base de données.");
            res.status(200).send(parties);
        });
});
// RETURNS ALL THE PARTIES IN THE DATABASE
router.get('/', function (req, res) {
    Parties.find({}, function (err, users) {
        if (err) return res.status(500).send("Un problème est survenu lors de la recherche des parties.");
        res.status(200).send(parties);
    });
});
// GETS A SINGLE PARTIES FROM THE DATABASE
router.get('/:id', function (req, res) {
    Parties.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Un problème est survenu lors de la recherche de la parties.");
        if (!parties) return res.status(404).send("Aucune parties trouvées.");
        res.status(200).send(parties);
    });
});
// DELETES A PARTIES FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Parties.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Un problème est survenu lors de la suppression de la parties.");
        res.status(200).send("La parties "+ parties._id +" a été supprimé.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {

    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("Un problème est survenu lors de la mise à jour de la parties.");
        res.status(200).send(parties);
    });
});

module.exports = router;
