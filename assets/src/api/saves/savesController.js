const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Saves = require('./saves');

// CREATES A NEW SAVE
router.post('/', function (req, res) {
    Saves.create({
      id_users: req.body.id_users,
      game: req.body.game
        },
        function (err, saves) {
            if (err) return res.status(500).send("Un problème est survenu lors de la sauvegarde.");
            res.status(200).send(saves);
        });
});
// RETURNS ALL THE SAVES IN THE DATABASE
router.get('/', function (req, res) {
    Saves.find({}, function (err, saves) {
        if (err) return res.status(500).send("Un problème est survenu lors de la recherche de sauvegarde.");
        res.status(200).send(saves);
    });
});
// GETS A SINGLE SAVE FROM THE DATABASE
router.get('/:id', function (req, res) {
    Saves.findById(req.params.id, function (err, saves) {
        if (err) return res.status(500).send("Un problème est survenu lors de la recherche de la sauvegarde.");
        if (!saves) return res.status(404).send("Aucune parties n'a été sauvegarder.");
        res.status(200).send(saves);
    });
});
// DELETES A SAVES FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Saves.findByIdAndRemove(req.params.id, function (err, saves) {
        if (err) return res.status(500).send("Un problème est survenu lors de la suppression de la sauvegardes.");
        res.status(200).send("La sauvegarde "+ saves._id +" a été supprimé.");
    });
});

// UPDATES A SINGLE SAVE IN THE DATABASE
router.put('/:id', function (req, res) {

    Saves.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, saves) {
        if (err) return res.status(500).send("Un problème est survenu lors de la mise à jour de la sauvegarde.");
        res.status(200).send(saves);
    });
});

module.exports = router;
